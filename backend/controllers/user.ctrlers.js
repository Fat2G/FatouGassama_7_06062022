// Imports
//require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cryptoJs = require("crypto-js");
const User = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const { signupErrors, loginErrors } = require("../middlewares/errors");

// Constantes des variables d'environnement
const cryptoKeyMail = process.env.CRYPTOJS_KEY_EMAIL;
const secretToken = process.env.SECRET_TOKEN;

// Création du token encrypté pour une durée de 12h
const maxAge = 12 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, secretToken, {
    expiresIn: maxAge,
  });
};

// Enregistrement des utilisateurs
exports.signup = (req, res) => {
  //Chiffrage de l'adresse email
  const emailCryptoJs = cryptoJs
    .HmacSHA256(req.body.email, cryptoKeyMail)
    .toString();
  //hachage de l'adresse email
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: emailCryptoJs,
        password: hash,
        username: req.body.username,
      });
      // Enregistrement de l'utilisateur dans la base de données
      user
        .save()
        .then(() => {
          res.status(201).json({ message: "Utilisateur créé !" });
        })
        .catch((err) => {
          const errors = signupErrors(err);
          res.status(400).json({ errors });
        });
    })
    .catch((err) => res.status(500).json({ err }));
};

// Connexion des utilisateurs
exports.login = (req, res) => {
  //Chiffrage de l'adresse email
  const emailCryptoJs = cryptoJs
    .HmacSHA256(req.body.email, cryptoKeyMail)
    .toString();
  // Recherche de l'utilisateur dans la base de données
  User.findOne({ email: emailCryptoJs })
    .then((user) => {
      //si utilisateur non trouvé dans la base de données
      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé !" });
      }
      // si utilisateur trouvé:
      // Comparaison du mot de passe envoyé avec celui hashé dans la base de données
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          // si le mot de passe ne correspond pas
          if (!valid) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
          }
          // si le mot de passe correspond
          const token = createToken(user._id);
          // création d'un cookie contenant le token lisible uniquement par le serveur
          res.cookie("jwt", token, { httpOnly: true, maxAge });
          res.status(200).json({
            userId: user._id,
            token,
          });
        })
        .catch((err) => {
          const errors = loginErrors(err);
          res.status(400).json({ errors });
        });
    })
    .catch((err) => res.status(500).json({ err }));
};

//Déconnection des utilisateurs
exports.logout = (req, res) => {
  // le cookie créé lors de la connection est retiré en 1ms et renvoie l'utilisateur vers la page d'accueil
  // res.clearCookie("jwt");
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

// Suppression du compte utilisateur
exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);

  User.remove({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: "Utilisateur supprimé ! " });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

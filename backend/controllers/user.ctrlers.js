// Imports
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");

// Variables d'environnement
const secretToken = process.env.SECRET_TOKEN;

// Recherche d'un utilisateur selon son id
exports.getUser = (req, res) => {
  User.findOne({ _id: req.params.id })
    // Retrait de l'affichage du password pour plus de sécurité
    .select("-password")
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json({ error }));
};

// Recherche de tous les utilisateurs
exports.getAllUsers = (req, res) => {
  User.find()
    // Retrait de l'affichage du password pour plus de sécurité
    .select("-password")
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(500).json({ error }));
};

// Vérification de la présence et validité de l'ID utilisateur
exports.userId = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID non connu : " + req.params.id);

  User.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID non connu : " + err);
  }).select("-password");
};

// Suppression du compte utilisateur
exports.deleteUser = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);

  User.findOne({ _id: req.params.id }).then((user) => {
    // suppression de l'image
    const fileName = user.username + ".jpg";
    if (fileName !== "defaultImg.jpg") {
      fs.unlink(
        `${__dirname}/../../frontend/public/uploads/profil/${fileName}`,
        () => {
          User.deleteOne({ _id: req.params.id })
            .then(() =>
              res.status(200).json({ message: "Utilisateur supprimé !" })
            )
            .catch((error) => res.status(400).json({ error }));
        }
      );
    }
  });
};

// Controle du token utilisateur du token
exports.checkToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, secretToken, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

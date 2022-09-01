// Imports
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");

// Variables d'environnement
const secretToken = process.env.SECRET_TOKEN;

// Création du token encrypté pour une durée de 12h
const maxAge = 12 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, secretToken, {
    expiresIn: maxAge,
  });
};

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
    return res.status(400).send("ID non connue : " + req.params.id);

  User.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID non connue : " + err);
  }).select("-password");
};

// Suppression du compte utilisateur
exports.deleteUser = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);
  
  User.findOne({ _id: req.params.id })
    .then((user) => {
      // suppression de l'image
      const filename = user.picture.split("./uploads/profil/")[1];;
      if (filename !== "defaultImg.jpg") {
        fs.unlink(`./uploads/profil/${filename}`, (err) => {
          if (err) {
            throw err;
          }
        });
      }
    })
    .catch((err) => res.status(500).json({ err }));

  User.deleteOne({ _id: req.params.id })
    .then(() => {
      res.cookie("jwt", "", { maxAge: 1 });
      res.redirect("/");
      res.status(200).json({ message: "Utilisateur supprimé ! " });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

/* exports.deleteUser = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      // suppression de l'image
      const filename = user.picture.split("/images/users/")[1];
      if (filename !== "defaultImg.jpg") {
        fs.unlink(`images/users/${filename}`, (err) => {
          if (err) {
            throw err;
          }
        });
      }
    })
    .catch((err) => res.status(500).json({ err }));

  // vérification des autorisations
  if (req.params.id === req.token.userId) {
    // suppressions du compte et du cookie
    User.deleteOne({ _id: req.params.id })
      .then(() => {
        res.clearCookie("jwt");
        res.redirect("/");
      })
      .catch((error) => res.status(400).json({ error }));
  } else {
    res.status(401).json({ error: "Non autorisé !" });
  }
};
 */

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

// upload de l'image de profil
exports.uploadImg = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      // suppression de l'image par défaut
      const filename = user.picture.split("./uploads/profil/")[1];
      if (req.file && filename !== "defaultImg.jpg") {
        fs.unlink(`./uploads/profil/${filename}`, (err) => {
          if (err) {
            throw err;
          }
        });
      }

      // update de l'image
      if (req.params.id === req.token.userId) {
        User.updateOne(
          { _id: req.params.id },
          {
            picture: `${req.protocol}://${req.get("host")}/uploads/profil/${
              req.file.filename
            }`,
            _id: req.params.id,
          }
        )
          .then(() => res.status(200).json({ message: "Image mise à jour !" }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        res.status(401).json({ error: "Non autorisé" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

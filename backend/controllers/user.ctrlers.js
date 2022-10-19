// Imports
const User = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");

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
          // suppression du compte utiliseur dans la base de données
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
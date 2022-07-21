const bcrypt = require('bcrypt');
//import du modèle utilisateur
const User = require("../models/user.model");

// Enregistrement des utilisateurs
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash,
        username: req.body.username,
      });
      // Enregistrement de l'utilisateur dans la base de données
      user
        .save()
        .then(() => {
          res.status(201).json({ message: "Utilisateur créé !" });
        })
        .catch((error) => res.status(400).json({ error: "Utilisateur non créé !" }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Connexion des utilisateurs
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Adresse mail incorrecte" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Mot de passe incorrect" });
          }
          res.status(200).json({
            userId: user._id,
            token: "TOKEN",
          });
        })
        .catch((error) => res.status(400).json({ error : "Utilisateur non trouvé !" }));
    })
    .catch((error) => res.status(500).json({ error }));
};

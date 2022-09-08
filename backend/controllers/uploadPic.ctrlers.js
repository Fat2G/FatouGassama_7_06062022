const User = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../middlewares/errors");

// upload de l'image de profil
exports.uploadPic = (req, res) => {
  const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
  };

  try {
    if (!MIME_TYPES) {
      throw Error("invalid file");
    }
    if (req.file.size > 500000) {
      throw Error("max size");
    }
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(400).json({ errors });
  }

  // chaque username étant unique, le nom du fichier sera retourné en tant que "username + jpg" peu importe le type de fichier choisi par l'utilisateur.
  // Pas de surstockage d'image car l'image précédente sera écrasée par la nouvelle ayant le même nom
  const fileName = req.body.name + ".jpg";

  // création stockage des images en statique
  pipeline(
    req.file.stream,
    // chemin où sont stockées les images
    fs.createWriteStream(
      `${__dirname}/../../frontend/public/uploads/profil/${fileName}`
    )
  );
  // création du chemin pour la base de données
  try {
    User.findByIdAndUpdate(
      req.body.userId,
      { $set: { picture: "./uploads/profil/" + fileName } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

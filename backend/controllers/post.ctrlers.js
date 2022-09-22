const Post = require("../models/post.model");
const User = require("../models/user.model");
const { uploadErrors } = require("../middlewares/errors");
const ObjectId = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

// liste des posts
module.exports.readPost = (req, res) => {
  Post.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Pas de data : " + err);
  }).sort({ createdAt: -1 });
};

// création de posts
module.exports.createPost = async (req, res) => {
  let fileName;
  // contrôle de l'image à uploader
  if (req.file !== null) {
    try {
      if (
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/png" &&
        req.file.detectedMimeType != "image/jpeg"
      )
        throw Error("invalid file");

      if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }
    // Façon dont seront nommées les images en format jpg
    fileName = req.body.posterId + Date.now() + ".jpg";

    // création stockage des images en statique
    await pipeline(
      req.file.stream,
      // chemin où sont stockées les images
      fs.createWriteStream(
        `${__dirname}/../../frontend/public/uploads/posts/${fileName}`
      )
    );
  }
  // le modèle post est incrémenté
  const newPost = new Post({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.file !== null ? "./uploads/posts/" + fileName : "",
    likers: [],
  });

  // enregistrement du post dans la base de données
  newPost
    .save()
    .then(() => res.status(201).json({ newPost }))
    .catch((error) => res.status(400).json({ error }));
};

// modification des posts
module.exports.updatePost = (req, res) => {
  if (!ObjectId.isValid(req.params.id) || User.admin === 0)
    return res.status(400).send("ID non connu : " + req.params.id);

  const updatedPost = {
    message: req.body.message,
  };
  
  Post.findByIdAndUpdate(
    req.params.id,
    { $set: updatedPost },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
};

// suppression des posts
module.exports.deletePost = (req, res) => {
  if (!ObjectId.isValid(req.params.id) || User.admin === 0)
    return res.status(400).send("ID inconnu : " + req.params.id);

  Post.findOne({ _id: req.params.id }).then((post) => {
    // suppression de l'image statique
    const fileName = post.picture.split("./uploads/posts/")[1];
    fs.unlink(
      `${__dirname}/../../frontend/public/uploads/posts/${fileName}`,
      () => {
        // suppression du post dans MongoDB
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Post supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      }
    );
  });
};

// ajout de likes
module.exports.likePost = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id inconnu : " + req.params.id);

  try {
    /* Ajout de l'id utilisateur au tableau likers du post */
    Post.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likers: req.body.id } },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );

    /* Ajout de l'id du post au tableau likes de l'utilisateur */
    User.findByIdAndUpdate(
      req.body.id,
      { $addToSet: { likes: req.params.id } },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

// retrait de likes
module.exports.unlikePost = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);

  try {
    /* Retrait de l'id utilisateur au tableau likers du post */
    Post.findByIdAndUpdate(
      req.params.id,
      { $pull: { likers: req.body.id } },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );

    /* Retrait de l'id du post au tableau likes de l'utilisateur */
    User.findByIdAndUpdate(
      req.body.id,
      { $pull: { likes: req.params.id } },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

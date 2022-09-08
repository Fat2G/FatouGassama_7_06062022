const Post = require("../models/post.model");
const User = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

// liste des posts
module.exports.readPost = (req, res) => {
  Post.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Pas de data : " + err);
  });
};

// création de posts
module.exports.createPost = (req, res) => {
  // le modèle post est incrémenté
  const newPost = new Post({
    posterId: req.body.posterId,
    message: req.body.message,
    likes: 0,
    usersLiked: [],
  });

  // enregistrement du post dans la base de données
  newPost
    .save()
    .then(() => res.status(201).json({ newPost }))
    .catch((error) => res.status(400).json({ error }));
};

// modification des posts
module.exports.updatePost = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
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
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);

  Post.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
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

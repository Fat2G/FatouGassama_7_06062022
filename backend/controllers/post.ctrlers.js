const Post = require("../models/post.model");
const User = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.readPost = (req, res) => {
  Post.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Pas de data : " + err);
  });
};

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

module.exports.deletePost = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID non connue : " + req.params.id);

  Post.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
};

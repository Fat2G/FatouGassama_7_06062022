// routeur
const express = require("express");
const router = express.Router();
//import du controller post
const postCtrl = require("../controllers/post.ctrlers");
const multer = require("multer");
const upload = multer();

//CRUD
router.get("/", postCtrl.readPost);
router.post("/", upload.single('file'), postCtrl.createPost);
router.put("/:id", postCtrl.updatePost);
router.delete("/:id", postCtrl.deletePost);

//likes
router.patch("/like-post/:id", postCtrl.likePost);
router.patch("/unlike-post/:id", postCtrl.unlikePost);

module.exports = router;

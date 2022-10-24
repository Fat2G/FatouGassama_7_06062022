// routeur
const express = require("express");
const router = express.Router();
//import du controller post
const postCtrl = require("../controllers/post.ctrlers");
const multer = require("multer");
const upload = multer();
const { checkTokenUser } = require("../middlewares/auth");

//CRUD
router.get("/", checkTokenUser, postCtrl.readPost);
router.post("/", checkTokenUser, upload.single("file"), postCtrl.createPost);
router.put("/:id", checkTokenUser, upload.single("file"), postCtrl.updatePost);
router.delete("/:id", checkTokenUser, postCtrl.deletePost); 

//likes
router.patch("/like-post/:id", checkTokenUser, postCtrl.likePost);
router.patch("/unlike-post/:id", checkTokenUser, postCtrl.unlikePost);

module.exports = router;

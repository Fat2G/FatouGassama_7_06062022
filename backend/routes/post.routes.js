// routeur
const express = require("express");
const router = express.Router();
//import du controller post
const postCtrl = require("../controllers/post.ctrlers");
const multer = require("multer");
const upload = multer();
const { checkToken } = require("../middlewares/auth");

//CRUD
router.get("/", checkToken, postCtrl.readPost);
router.post("/", checkToken, upload.single("file"), postCtrl.createPost);
router.put("/:id", checkToken, upload.single("file"), postCtrl.updatePost);
router.delete("/:id", checkToken, postCtrl.deletePost); 

//likes
router.patch("/like-post/:id", checkToken, postCtrl.likePost);
router.patch("/unlike-post/:id", checkToken, postCtrl.unlikePost);

module.exports = router;

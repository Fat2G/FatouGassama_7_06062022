const express = require("express");
const router = express.Router();
//import du controller post
const postCtrl = require('../controllers/post.ctrlers');

//CRUD
router.get('/', postCtrl.readPost);
router.post('/', postCtrl.createPost);
router.put('/', postCtrl.updatePost);
router.delete('/', postCtrl.deletePost);

module.exports = router;
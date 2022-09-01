const express = require("express");
const router = express.Router();
//import du controller post
const postCtrl = require('../controllers/post.ctrlers');

//CRUD
router.get('/', postCtrl.readPost);
router.post('/', postCtrl.createPost);
router.put('/:id', postCtrl.updatePost);
router.delete('/:id', postCtrl.deletePost);

module.exports = router;
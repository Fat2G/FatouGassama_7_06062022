const express = require("express");
const router = express.Router();
// import du controller utilisateur
const userCtrl = require("../controllers/user.ctrlers");
// import des middlewares
const email = require("../middlewares/email");
const password = require("../middlewares/password");
const connection = require("../middlewares/connection");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

//création des routes
router.post("/signup", email, password, userCtrl.signup);
router.post("/login", connection, userCtrl.login);
router.get("/:id/logout", auth, userCtrl.logout);
router.delete("/user/:id", auth, userCtrl.deleteUser);
// router.delete("/user/delete", auth, userCtrl.deleteUser);

//router.put("/id", auth, multer, )

// export du routeur
module.exports = router;

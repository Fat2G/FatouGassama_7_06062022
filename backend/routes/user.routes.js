const express = require("express");
const router = express.Router();
// import du controller utilisateur
const userCtrl = require("../controllers/user.ctrlers");
const authCtrl = require("../controllers/auth.ctrlers");
const uploadCtrl = require("../controllers/uploadPic.ctrlers");
// import des middlewares
const email = require("../middlewares/email");
const password = require("../middlewares/password");
const connection = require("../middlewares/connection");
const { checkTokenUser } = require("../middlewares/auth");
const multer = require("multer");
const upload = multer();

/////////// création des routes

// authentification
router.post("/signup", email, password, authCtrl.signup);
router.post("/login", connection, authCtrl.login);
router.get("/logout", authCtrl.logout);

// utilisateur
router.get("/", checkTokenUser, userCtrl.getAllUsers);
router.get("/:id", checkTokenUser, userCtrl.userId);
router.get("/:id", checkTokenUser, userCtrl.getUser);

// profil
router.delete("/:id", checkTokenUser, userCtrl.deleteUser);
router.post("/upload", checkTokenUser, upload.single("file"), uploadCtrl.uploadPic);
// export du routeur
module.exports = router;

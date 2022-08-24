const express = require("express");
const router = express.Router();
// import du controller utilisateur
const userCtrl = require("../controllers/user.ctrlers");
const authCtrl = require("../controllers/auth.ctrlers");
// import des middlewares
const email = require("../middlewares/email");
const password = require("../middlewares/password");
const connection = require("../middlewares/connection");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

/////////// création des routes

// authentification
router.post("/signup", email, password, authCtrl.signup);
router.post("/login", connection, authCtrl.login);
router.get("/logout", auth, authCtrl.logout);

// utilisateur
router.get("/", auth, userCtrl.getAllUsers);
router.get("/:id", userCtrl.userId);
router.get("/:id", auth, userCtrl.getUser);
router.get("/jwt", userCtrl.checkToken);

// profil
router.delete("/:id", userCtrl.deleteUser);


// export du routeur
module.exports = router;

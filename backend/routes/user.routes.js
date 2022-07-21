const express = require("express");
//création du routeur
const router = express.Router();

// import du controller utilisateur
const userCtrl = require("../controllers/user.ctrlers");
// import du middleware de contrôle de l'adresse mail
const email = require("../middlewares/email");
// import du middleware de contrôle du mot de passe
const password = require("../middlewares/password");
// import du middleware de tentatives de connexion
const connection = require("../middlewares/connection");

//création de routes POST
router.post("/signup", email, password, userCtrl.signup);
router.post("/login", connection, userCtrl.login);

// export du routeur
module.exports = router;

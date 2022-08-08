require("dotenv").config();
const jwt = require("jsonwebtoken");

const secretToken = process.env.SECRET_TOKEN;

//export du middleware d'authentification
module.exports = (req, res, next) => {
  try {
    //récupération du cookie contenant le token
    const token = req.cookies.jwt;
    // vérification du token
    req.token = jwt.verify(token, secretToken);

    // comparaison de l'ID de l'utilisateur avec celui du corps de la requête
    if (req.body.userId && req.body.userId !== req.token.userId) {
      throw "user ID non valable";
    } else {
      next();
    }
  } catch (err) {
    res.status(403).json({ message: "Accès refusé !" + err });
  }
};

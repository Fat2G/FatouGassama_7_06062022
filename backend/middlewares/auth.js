require("dotenv").config();
const jwt = require("jsonwebtoken");

//export du middleware d'authentification
module.exports = (req, res, next) => {
  try {
    //récupération du token par la méthode split
    const token = req.headers.authorization.split(" ")[1];
    // décodage du token ayant pour arguments le token à encoder et la clé d'encodage
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    // extraction de l'userId
    const userId = decodedToken.userId;
    // comparaison de l'ID de l'utilisateur avec celui du corps de la requête
    if (req.body.userId && req.body.userId !== userId) {
      throw "user ID non valable";
    } else {
      next();
    }
  } catch (err) {
    res.status(401).json({ err });
  }
};

require("dotenv").config();
const jwt = require("jsonwebtoken");

const secretToken = process.env.SECRET_TOKEN;

//export du middleware d'authentification
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, secretToken, (err, decodedToken) => {
      if (err) {
        res.send(200).json(err);
      } else {
        console.log("decodedtoken "+ decodedToken.id);
        next();
      }
    });
  } else {
    console.log("Pas de token");
  }
};
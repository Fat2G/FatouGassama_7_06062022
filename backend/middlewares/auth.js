const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports.checkToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    // console.log("token " + token);
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Utilisateur inconnu !" });
    res.locals.user = null;
    next();
  }
};

exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(200).json("Pas de token");
      } else {
        console.log("auth ok " + decodedToken.id);
        next();
      }
    });
  } else {
    console.log("Pas de token");
  }
};

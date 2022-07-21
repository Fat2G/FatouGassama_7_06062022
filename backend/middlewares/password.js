// import de la dépendance password-validator qui impose des règles quant à l'écriture du mot de passe (regEx)
const passwordValidator = require("password-validator");

/* création du schéma de validation du mot de passe */
const schemaValidator = new passwordValidator();
// paramètres requis lors de la validation
schemaValidator
.is().min(6)
.is().max(20)
.has().uppercase(1)
.has().lowercase(1)
.has().digits(2)
.has().not().spaces()
.is().not().oneOf(['Passw0rd', 'Password123']);

module.exports = (req, res, next) => {
  if (!schemaValidator.validate(req.body.password)){
    return res.status(404).json({ message:"Le mot de passe doit contenir entre 6 et 20 caractères, avec au moins un chiffre et une majuscule !" });
  } else {
    next();
  }
};
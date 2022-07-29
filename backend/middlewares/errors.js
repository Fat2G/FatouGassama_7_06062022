// Messages d'erreur qui sont retournés si besoin lors de la création de compte
module.exports.signupErrors = (err) => {
  let errors = { email: "", password: "", username: "" };

  // Messages d'erreur qui seront affichés selon chaque cas de figure
  if (err.message.includes("email"))
    errors.email = "Adresse email incorrecte ou existante";

  if (err.message.includes("password"))
    errors.password =
      "Le mot de passe doit être compris entre 6 et 20 caractères, doit avoir au moins une lettre majuscule et minuscule ainsi que 2 chiffres minimum";

  if (err.message.includes("username"))
    errors.username = "Nom d'utilisateur incorrect ou déjà pris";

  // Si le code MongoError retourne 11000 et inclut dans le keyValue email ou username, ces messages seront affichés
  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Cette adresse email a déjà un compte créé";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("username"))
    errors.username = "Ce nom d'utilisateur est déjà pris";

  return errors;
};

// Messages d'erreur qui sont retournés si besoin lors de la connexion
module.exports.loginErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message.includes("email")) errors.email = "Adresse email inconnue";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe ne correspond à l'adresse email rentrée";

  return errors;
};

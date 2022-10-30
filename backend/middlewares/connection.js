// import de la dépendance express-rate-limit afin de limiter le nombre de tentatives de connections possibles
const rateLimit = require("express-rate-limit");

// configuration du nombre de tentatives possibles avant d'être bloqué
const maxAttemps = rateLimit({
  // temps d'attente
  windowMs: 1 * 60 * 1000,
  // tentatives limitées à 3 avant d'être bloqué
  max: 3,
  message: "Votre compte a été bloqué, veuillez réessayer dans 1 minutes.",
});

module.exports = maxAttemps;
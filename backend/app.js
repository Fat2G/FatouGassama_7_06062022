const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//import du routeur utilisateur
const userRoutes = require("./routes/user.routes");
// utilisation des variables d'environnement pour cacher les données sensibles comme les identifiants mongoDB
require("dotenv").config();
const dbUserName = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbCluster = process.env.DB_CLUSTER;

//test
app.use(express.json());

//connexion au serveur mongoDB
mongoose
  .connect(
    `mongodb+srv://${dbUserName}:${dbPassword}@${dbCluster}.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// middlewares
app.use(bodyParser.json());

app.use("/api/auth", userRoutes);

module.exports = app;

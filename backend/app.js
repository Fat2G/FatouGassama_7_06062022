const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const path = require("path");

//import du routeur utilisateur
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

//import des middlewares
const { checkTokenUser, requireAuth } = require("./middlewares/auth");

const dbUserName = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbCluster = process.env.DB_CLUSTER;

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet.crossOriginResourcePolicy({ policy: "same-site" }));

// Vérification des utilisateurs
app.get("*", checkTokenUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);

module.exports = app;

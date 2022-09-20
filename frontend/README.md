#  PROJET N°7 - CREEZ UN RESEAU SOCIAL D'ENTREPRISE

### INSTALLATION ###

Pour utiliser l'application, il faudra installer sur votre machine:
- NodeJS  14.18.0 ou +
- Angular CLI 13.3.1 ou +

#### 1. Copie des dossiers Frontend et Backend ####

- Créer un dossier vide qui contiendra le projet, regroupé dans deux dossiers (un dossier frontend et un dossier backend).

- Ouvrez un terminal à partir du dossier nouvellement créé.
 
 - Clonez les dossiers "frontend" et "backend" en exécutant la commande suivante: 
<pre><code>git clone https://github.com/Fat2G/FatouGassama_7_06062022.git </code></pre>


#### 2. Installation du dossier Frontend ####

- Ouvrez un terminal à partir du sous-répertoire **frontend** depuis votre IDE
- Exécutez la commande `npm install`
- Lancez l'application en exécutant la commande `npm start`


#### 3. Installation du dossier Backend ####

- Ouvrez un terminal à partir du sous-répertoire **backend** et exécutez la commande `npm install` afin d'installer toutes les dépendances.

- Une fois les dépendances installées, veuillez exécuter la commande `nodemon server` afin de lancer le serveur.


#### 4. Création et configuration d'une base de données noSQL MongoDB ####
 
Afin que l'application puisse fonctionner, il vous faudra créer une base de données [MongoDB](https://www.mongodb.com/).

- Pour ce faire, veuillez opérer de la façcon suivante:
     - Créez un compte
     - Créez votre base de données en veillant à ce que l'utilisateur puisse exécuter l'application sur sa propre machine en configutant les paramètres
     <pre><code>Network Access -> Allow access from anywhere</code></pre>
     - A la suite de ces étapes vous devriez avoir:
          - Un identifiant à la base de données
          - Un mot de passe à la base de données
 

#### 5. Configuration des variables d'environnement ####

A la racine du dossier "backend", veuillez créer un ficher `.env` en suivant l'exemple du fichier `.env_example`. Ce fichier servira à renseigner votre identifiant et mot de passe MongoDB ainsi que les différentes chaînes de cryptage.

- Le fichier .env contient les variables d'environnement suivants:
     - DB_USERNAME (identifiant de connexion à la base de données)
     - DB_PASSWORD (mot de passe de connexion à la base de données)
     - DB_CLUSTER (nom du cluster)
     - CRYPTOJS_KEY_EMAIL (chaîne de caractères aléatoire) 
     - JWT_KEY (chaîne de caractères aléatoire)
     - SECRET_TOKEN (chaîne de caractères aléatoire)

**Le ficher `.env` à la racine du dossier "frontend", correspond à l'url du backend afin de faire des requêtes API. Cette application utilise l'url `http://localhost:5000` .**


#### 6. Environnement de développement ####

- Utilisation du runtime **Node.js**
- Utilisation du framework **Express**
- Utilisation de **MongoDB** pour l'hébergement et la gestion de la base de données


#### 7. Dépendances utilisées dans le frontend ####

- **axios :** crypte et hashe les mots de passe
- **dotenv :** permet l'utilisation de variables d'environnement 
- **js-cookie :** permet de gérer les cookies facilement
- **node-sass :** est une bibliothèque fournissant la liaison de Node.js à LibSass
- **react :** est une bibliothèque JavaScript pour créer des interfaces utilisateurs
- **react-dom :** est un package react pour travailler avec le DOM
- **react-redux :** permet l'utilisation de redux dans le cadre d'une application React
- **react-router-dom :** permet le routage pour les applications React
- **redux :** est une bibliothèque fournissant un conteneur d'état "predictable state container"
- **redux-thunk :** est un middleware pour Redux permettant d'envoyer des actions en faisant des dispatchs

#### 8. Dépendances utilisées dans le backend ####

- **bcrypt :** crypte et hashe les mots de passe
- **body-parser :** analyse le corps des requêtes
- **cookie-parser :** fournit un middleware pour l'analyse des cookies
- **crypto-js :** crypte l'adresse email avant d'être envoyée à la base de données
- **dotenv :** permet l'utilisation de variables d'environnement 
- **express :** construit des applications web basées sur Node.js grâce à son framework
- **express-rate-limit :** limite le nombre répété de requêtes
- **helmet :** sécurise les applications Express à l'aide de headers HTTP variés
- **jsonwebtoken :** crée et vérifie les tokens d'authentification
- **mongoose :** connecte l'application avec la base de données MongoDB
- **mongoose-unique-validator :** évite que deux utilisateurs ne s'inscrivent avec la même adresse email
- **multer :** permet la gestion des fichiers envoyés dans les requêtes
- **nodemon :** relance le serveur automatiquement à chaque modification
- **password-validator :** vérifie les mots de passe lors de l'inscription
- **validator :** est utilisé dans ce contexte pour vérifier la validation des adresses mail


const multer = require('multer');

//types de fichiers acceptés
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// configuration multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // 'null' = pas d'erreurs
    // 'images' = nom du dossier créé pour stocker les images
    callback(null, 'images/users')
  },
  // paramétrage du nouveau nom des fichiers images
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  }
});

module.exports = multer({storage}).single('image');
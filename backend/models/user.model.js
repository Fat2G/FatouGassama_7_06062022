const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    imageUrl: {type: String},
    admin: { type: Number, default: 0 },
  },
  { timestamps: true }
);

//utilisation de mongoose-unique-validator au schéma avant d'en faire un modèle
userSchema.plugin(uniqueValidator);

//export du schéma sous forme de modèle mongoose
module.exports = mongoose.model("User", userSchema);

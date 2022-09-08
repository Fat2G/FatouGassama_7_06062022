const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    posterId: { type: String, required: true },
    message: { type: String, trim: true, maxLength: 1000 },
    picture: { type: String },
    likers: { type: [String], required: true },
  },
  { timestamps: true }
);

//export du schéma sous forme de modèle mongoose
module.exports = mongoose.model("Post", postSchema);

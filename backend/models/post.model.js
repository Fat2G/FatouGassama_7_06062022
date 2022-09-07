const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new mongoose.Schema(
  {
    posterId: { type: String, required: true },
    message: { type: String, trim: true, maxLength: 1000 },
    picture: { type: String },
    likes: { type: Number, default: 0, required: true },
    usersLiked: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

//export du schéma sous forme de modèle mongoose
module.exports = mongoose.model("Post", postSchema);

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    PosterId: { type: String, required: true },
    message: { type: String, trim: true, maxLength: 1000 },
    picture: { type: String },
    likes: { type: Number, default: 0, required: true },
    dislikes: { type: Number, default: 0, required: false },
    usersLiked: [{ type: Schema.Types.ObjectId, ref: "User" }],
    usersDisliked: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

//export du schéma sous forme de modèle mongoose
module.exports = mongoose.model("Post", postSchema);
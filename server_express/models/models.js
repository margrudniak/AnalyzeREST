const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
const key = require("../keys");

const connection = mongoose.createConnection(key);

autoIncrement.initialize(connection);

const postSchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId, ref: "Id" },
    post: "",
  },
  { strict: false }
);

postSchema.plugin(autoIncrement.plugin, "Post");
var Post = connection.model("Post", postSchema);

module.exports = Post;

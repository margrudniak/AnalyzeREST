const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
const key = require("../keys");

var connection = mongoose.createConnection(key);

autoIncrement.initialize(connection);

const timesPostsSchema = new Schema({
  id: { type: Schema.Types.ObjectId, ref: "Id" },
  timeGetOne: [],
  timePostOne: [],
  timeDeleteOne: [],
  timeUpdateOne: [],
});

timesPostsSchema.plugin(autoIncrement.plugin, "TimesPosts");
var TimesPosts = connection.model("TimesPosts", timesPostsSchema);

module.exports = TimesPosts;

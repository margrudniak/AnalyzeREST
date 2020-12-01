const mongoose = require("mongoose");
const TimesPosts = require("../models/modelTimesPosts");
var store = require("store");

exports.plugin = {
  register: (server, options) => {
    server.route({
      method: "POST",
      path: "/add",
      handler: (req, res) => {
        const timePost = store.get("timePost");
        const timeGet = store.get("timeGet");
        const timeDelete = store.get("timeDelete");
        const timeUpdate = store.get("timeUpdate");

        const newTimePost = new TimesPosts({
          timeGetOne: timeGet,
          timePostOne: timePost,
          timeDeleteOne: timeDelete,
          timeUpdateOne: timeUpdate,
        });

        return newTimePost.save().then((err, res) => {
          if (err) {
            return err;
          }
          return res;
        });
      },
    });
    server.route({
      method: "GET",
      path: "/getget",
      handler: (req, res) => {
        return TimesPosts.findById({ _id: 0 }).then((err, res) => {
          if (err) {
            return err;
          }
          return res;
        });
      },
    });
  },
  name: "api1",
};

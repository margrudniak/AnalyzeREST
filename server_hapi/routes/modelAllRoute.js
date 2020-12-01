const mongoose = require("mongoose");
const Post = require("../models/models");

exports.plugin = {
  register: (server, options) => {
    server.route({
      method: "GET",
      path: "/get",
      handler: (req, res) => {
        return Post.find({}).then((err, res) => {
          if (err) {
            return err;
          }
          return res;
        });
      },
    });

    server.route({
      method: "GET",
      path: "/get/{id}",
      handler: (req, res) => {
        return Post.findById(req.params.id).then((err, res) => {
          if (err) {
            return err;
          }
          return res;
        });
      },
    });

    server.route({
      method: "DELETE",
      path: "/{id}",
      handler: (req, res) => {
        return Post.findByIdAndDelete(req.params.id).then((err, res) => {
          if (err) {
            return err;
          }
          return res;
        });
      },
    });
  },
  name: "api",
};

let Post = require("../models/models");
const { randomTextGen } = require("../util/randomTextGen");

const obj = (req) => {
  const newPost = new Post({});

  for (let x = 0; x < req.params.size; x++) {
    newPost.set("post" + x, randomTextGen(req.params.length));
  }

  return newPost;
};

exports.plugin = {
  register: (server, options) => {
    server.route({
      method: "POST",
      path: "/add/{length}/{size}",
      handler: (req, res) => {
        return obj(req)
          .save()
          .then((err, res) => {
            if (err) {
              return err;
            }
            return res;
          });
      },
    });

    server.route({
      method: "PUT",
      path: "/update/{id}/{length}/{size}",
      handler: (req, res) => {
        return Post.findByIdAndUpdate(req.params.id, obj(req)).then(
          (err, res) => {
            if (err) {
              return err;
            }
            return res;
          }
        );
      },
    });
  },
  name: "api766",
};

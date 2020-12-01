let Post = require("../models/models");
const { randomTextGen } = require("../util/randomTextGen");

const str = (req) => {
  const post = randomTextGen(req.params.length);

  const newPost = new Post({
    post,
  });

  return newPost;
};

exports.plugin = {
  register: (server, options) => {
    server.route({
      method: "POST",
      path: "/add/{length}",
      handler: (req, res) => {
        return str(req)
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
      path: "/update/{id}/{length}",
      handler: (req, res) => {
        return Post.findByIdAndUpdate(req.params.id, str(req)).then(
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
  name: "api77",
};

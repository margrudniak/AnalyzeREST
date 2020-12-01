const router = require("express").Router();
let Post = require("../models/models");
const { randomTextGen } = require("../util/randomTextGen");

const str = (req) => {
  const post = randomTextGen(req.params.length);

  const newPost = new Post({
    post,
  });

  return newPost;
};

router.route("/add/:length").post((req, res) => {
  str(req)
    .save()
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
});

router.route("/update/:id/:length").put((req, res) => {
  Post.findByIdAndUpdate(req.params.id, str(req))
    .then((post) => res.json(post))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
});

module.exports = router;

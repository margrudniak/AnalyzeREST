const router = require("express").Router();
let Post = require("../models/models");
const { randomTextGen } = require("../util/randomTextGen");

const arr = (req) => {
  const newPost = new Post({
    array: [],
  });
  for (let x = 0; x < req.params.size; x++) {
    newPost.array.push(randomTextGen(req.params.length));
  }

  return newPost;
};

router.route("/add/:length/:size").post((req, res) => {
  arr(req)
    .save()
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
});

router.route("/update/:id/:length/:size").put((req, res) => {
  Post.findByIdAndUpdate(req.params.id, arr(req))
    .then((post) => res.json(post))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
});

module.exports = router;

const router = require("express").Router();
let Post = require("../models/models");
const { randomTextGen } = require("../util/randomTextGen");

const arrObjt = (req) => {
  const newPost = new Post({
    array: [],
  });
  const tempPost = new Post({});
  for (let x = 0; x < req.params.size; x++) {
    newPost.array.push(
      tempPost.set("post" + x, randomTextGen(req.params.length))
    );
  }

  return newPost;
};

router.route("/add/:length/:size").post((req, res) => {
  arrObjt(req)
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
  Post.findByIdAndUpdate(req.params.id, arrObjt(req))
    .then((post) => res.json(post))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
});

module.exports = router;

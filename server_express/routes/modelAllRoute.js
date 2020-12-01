const router = require("express").Router();
let Post = require("../models/models");

//Get ALL posts
router.route("/get").get((req, res) => {
  Post.find({})
    .then((posts) => res.json(posts))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
});

router.route("/get/:id").get((req, res) => {
  Post.findById(req.params.id)
    .then((posts) => res.json(posts))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
});

//Delete ONE Post
router.route("/:id").delete((req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then((posts) => res.json(posts))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
});

//Delete Collection

module.exports = router;

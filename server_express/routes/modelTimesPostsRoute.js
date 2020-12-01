const router = require("express").Router();
let TimesPosts = require("../models/modelTimesPosts");
var store = require("store");

router.route("/add").post((req, res) => {
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

  newTimePost
    .save()
    .then(() => res.json("NewTimePostOne added!"))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
});

router.route("/").get((req, res) => {
  TimesPosts.find({})
    .then((timespost) => res.json(timespost))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
});
router.route("/getget").get((req, res) => {
  TimesPosts.findById({ _id: 0 })
    .then((timespost) => res.json(timespost))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
});

module.exports = router;

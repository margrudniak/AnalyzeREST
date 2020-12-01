const express = require("express");
const app = express();
const mongoose = require("mongoose");
var store = require("store");
const key = require("./keys");
const cors = require("cors");

app.use(cors());

const modelAllRoute = require("./routes/modelAllRoute");
const modelStrRoute = require("./routes/modelStrRoute");
const modelObjRoute = require("./routes/modelObjRoute");
const modelArrRoute = require("./routes/modelArrRoute");
const modelArrObjRoute = require("./routes/modelArrObjRoute");
const timesPostsRoute = require("./routes/modelTimesPostsRoute");

const timePost = [];
const timeGet = [];
const timeDelete = [];
const timeUpdate = [];

//database Connection
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose
  .connect(key)
  .then(() => console.log("~~= connected to database =~~"))
  .catch((err) => {
    console.log(err.message);
  });

const connection = mongoose.connection;

//clear database
const dropDatabase = () => {
  connection.dropDatabase();
};

app.get("/clear", (req, res, next) => {
  dropDatabase();
  res.send("cleared");
});

//counting time on routes path
//can be use  -  all
app.use(/\/((?!timesPosts).)*/, function (req, res, next) {
  var start = process.hrtime();

  res.on("finish", function () {
    var hrtime = process.hrtime(start);
    const elapsed = parseFloat(
      hrtime[0] + (hrtime[1] / 1000000).toFixed(3),
      10
    );
    console.log(elapsed + "ms");
    if (elapsed > 10) {
      switch (req.method) {
        case "POST":
          console.log("To jest post");
          timePost.push(elapsed);
          console.log(timePost);
          store.set("timePost", timePost);
          break;
        case "GET":
          console.log("To jest get");
          timeGet.push(elapsed);
          console.log(timeGet);
          store.set("timeGet", timeGet);
          break;
        case "DELETE":
          console.log("To jest delete");
          timeDelete.push(elapsed);
          console.log(timeDelete);
          store.set("timeDelete", timeDelete);
          break;
        case "PUT":
          console.log("To jest put");
          timeUpdate.push(elapsed);
          console.log(timeUpdate);
          store.set("timeUpdate", timeUpdate);
          break;
        default:
          console.log("Coś poszło nie tak");
      }
    } else console.log("Wynik był zbyt mały");
  });

  next();
});

//routes
app.use("/str", modelStrRoute);
app.use("/obj", modelObjRoute);
app.use("/arr", modelArrRoute);
app.use("/arrObj", modelArrObjRoute);
app.use("/timesPosts", timesPostsRoute);
app.use("/posts", modelAllRoute);

//port listen
const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

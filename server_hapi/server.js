const Hapi = require("hapi");
const mongoose = require("mongoose");
var store = require("store");
const key = require("./keys");

const timePost = [];
const timeGet = [];
const timeDelete = [];
const timeUpdate = [];

const server = new Hapi.Server({
  host: "localhost",
  port: 5000,
  routes: {
    cors: true,
  },
});

mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
server.app.db = mongoose
  .connect(key)
  .then(() => console.log("connected to database"))
  .catch((err) => {
    console.log(err.message);
  });

const connection = mongoose.connection;

const dropDatabase = () => {
  connection.dropDatabase();
};

const init = async () => {
  server.route({
    method: "GET",
    path: "/clear",
    handler: (req, res) => {
      dropDatabase();
      return null;
    },
  });

  server.ext({
    type: "onRequest",
    method: function (request, h) {
      request.headers["start"] = process.hrtime();
      return h.continue;
    },
  });

  server.ext({
    type: "onPreResponse",
    method: function (request, h) {
      var start = request.headers["start"];
      var hrtime = process.hrtime(start);
      const elapsed = parseFloat(
        hrtime[0] + (hrtime[1] / 1000000).toFixed(3),
        10
      );
      console.log(elapsed + "ms");
      if (
        elapsed > 10 &&
        request.route.path !== "/timesPosts/add" &&
        request.route.path !== "/clear"
      ) {
        switch (request.method) {
          case "post":
            console.log("To jest post");
            timePost.push(elapsed);
            console.log(timePost);
            store.set("timePost", timePost);
            break;
          case "get":
            console.log("To jest get");
            timeGet.push(elapsed);
            console.log(timeGet);
            store.set("timeGet", timeGet);
            break;
          case "delete":
            console.log("To jest delete");
            timeDelete.push(elapsed);
            console.log(timeDelete);
            store.set("timeDelete", timeDelete);
            break;
          case "put":
            console.log("To jest put");
            timeUpdate.push(elapsed);
            console.log(timeUpdate);
            store.set("timeUpdate", timeUpdate);
            break;
          default:
            console.log("Coś poszło nie tak");
            break;
        }
      } else console.log("Wynik był zbyt mały");
      return h.continue;
    },
  });

  await server
    .register([
      {
        plugin: require("./routes/modelAllRoute"),
        routes: {
          prefix: "/posts",
        },
      },
      {
        plugin: require("./routes/modelArrObjRoute"),
        routes: {
          prefix: "/arrObj",
        },
      },
      {
        plugin: require("./routes/modelArrRoute"),
        routes: {
          prefix: "/arr",
        },
      },
      {
        plugin: require("./routes/modelObjRoute"),
        routes: {
          prefix: "/obj",
        },
      },
      {
        plugin: require("./routes/modelStrRoute"),
        routes: {
          prefix: "/str",
        },
      },
      {
        plugin: require("./routes/modelTimesPostsRoute"),
        routes: {
          prefix: "/timesPosts",
        },
      },
    ])
    .catch((err) => {
      console.log(err);
    });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();

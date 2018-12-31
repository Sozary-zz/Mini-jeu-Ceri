const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const mongoUrl = "mongodb+srv://mehdi:1234@mean-lwa6j.mongodb.net/test?retryWrites=true"
const http = require("http");

// Declaration des variables
const port = "8080";

const server = http.createServer({}, app).listen(port, function () {
  console.log(`App launched on ${port}`);
});
const io = require("socket.io")(server);
var gameRoom = []
var availableAvatar = [
  "jigglypuff",
  "pikachu",
  "squirtle",
  "eevee"
]

app.use("/css", express.static(__dirname + "/Game/css"));
app.use("/images", express.static(__dirname + "/Game/images"));
app.use("/scripts", express.static(__dirname + "/Game/scripts"));
app.use("/app", express.static(__dirname + "/Game/app"));
app.use("/modules", express.static(__dirname + "node_modules/"));
app.use(express.static(__dirname + "/Game/public"))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
io.on('connection', function (socket) {
  socket.on('new_connection', function (data) {
    MongoClient.connect(mongoUrl, function (err, client) {
      client.db("cerigame").collection("players").count({}, function (error, numOfPlayers) {
        if (error) throw error;
        if (numOfPlayers < 4)
          socket.emit("need_user_name")
        else
          socket.emit("too_much_user")
      })
    })
  });
  // socket.on('disconnect', () => {
  //   clients = clients.filter(id => id !== socket.id)
  // })
  socket.on("given_user", (data) => {
    // the following mught be in the callback instead
    let newUser = {
      name: data.user,
      avatar: availableAvatar.splice(Math.floor(Math.random() * Math.floor(availableAvatar.length)), 1)[0]
    }
    gameRoom.push(newUser)
    //    actions with db then callback
    MongoClient.connect(mongoUrl, function (err, client) {
      console.log(availableAvatar)

      socket.emit("user_ok", newUser)
      // client.db("cerigame").collection("players").insertOne({
      //   "username": data.user,
      // }, () => {
      //   socket.emit("user_ok", newUser)
      // })
    });
  })
  socket.on('challenge', function (data) {
    socket.broadcast.emit('newChallenge', data);
  });
});

app.post('/new', function (req, res) {
  // MongoClient.connect(mongoUrl, function(err, client) {       
  //   client.db("language").collection("polish").insertOne({
  //     "Polish": req.body.pl,
  //     "French": req.body.fr,
  //   }, () => {
  //     res.json()
  //   })    
  // })
})
app.get('/list', (req, res) => {
  // MongoClient.connect(mongoUrl, function(err, client) {        
  //   client.db("language").collection("polish").find().toArray().then((data) => {
  //     res.json(data)
  //   })    
  // })
})

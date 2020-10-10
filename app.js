const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const http = require("http");
var _ = require("lodash");
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true
});
const { v4: uuidV4 } = require("uuid");
const { parse: uuidParse } = require("uuid");
const bytes = uuidParse(uuidV4());
// [...bytes].map((v) => v
const roomNo = bytes[2].toString(16).padStart(2, "0");

app.use("/peerjs", peerServer);

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  // console.log(req.body.movieNaam);
  const apikey = "3d6868ca";

  const url = "http://www.omdbapi.com/?apikey=" + apikey + "&t=" + req.body.movieNaam; //Make sure that https is in there.
  // console.log(req.body.movieNaam);

  http.get(url, function (response) {
    console.log(response.statusCode); // This will give you code whether it is successful or not, is any error or not

    response.on("data", function (data) {
      // Get hold of data from the respnse
      const movieData = JSON.parse(data);
      if (movieData.Response === "True") {
        const country = movieData.Country;
        const year = movieData.Year;

        const genrefull = movieData.Genre;
        var genreshort = genrefull.split(",");
        var genreshortfirst = typeof genreshort[1] === "undefined" ? " " : genreshort[1];
        var genretwo = genreshort[0] + genreshortfirst;

        const duration = movieData.Runtime;
        const title = movieData.Title;
        const poster = movieData.Poster;
        const plot = movieData.Plot;

        const director = movieData.Director;
        const language = movieData.Language;
        const awards = movieData.Awards;
        const rated = movieData.Rated;
        const imdbRating1 = typeof movieData.Ratings[0] === "undefined" ? "-/-" : movieData.imdbRating;
        const rtRating = typeof movieData.Ratings[1] === "undefined" ? "-/-" : movieData.Ratings[1].Value;
        const type = _.capitalize(movieData.Type) + " !";

        res.render("list", {
          country: country,
          year: year,
          genretwo: genretwo,
          genre: genrefull,
          duration: duration,
          title: title,
          poster: poster,
          plot: plot,
          director: director,
          language: language,
          awards: awards,
          imdbRating: imdbRating1,
          rtRating: rtRating,
          type: type,
          rated: rated
        });
        res.send();
      } else {
        res.render("error");
      }
    });
  });
});

app.post("/back", function (req, res) {
  res.redirect("/");
});

//Can set the room number here.
app.get("/room", (req, res) => {
  res.redirect(`/${roomNo}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

// app.get("/echoAR", (req, res) => {
//   res.render("home");
// });

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
    // messages
    socket.on("message", (message) => {
      //send message to the same room
      io.to(roomId).emit("createMessage", message);
    });
    socket.on("disconnect", () => {
      socket.to(roomId).broadcast.emit("user-disconnected", userId);
    });
  });
});

server.listen(process.env.PORT || 3030);

// app.listen(process.env.PORT || 3000, function(){
//   console.log("Server created at port 3000");
// });

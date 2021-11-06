let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
var file = require('file-system');
var fs = require('fs');

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});

io.on('connection', function(socket) {
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
      console.log("connected");
      socket.on("save", function(arr){
            file.writeFile('Mazes.json', JSON.stringify(arr, null, 2), function () {
                console.log("DONE!");
            });
      });

      socket.on("loadReq", function () {
          console.log(LoadRandomMaze());
          let d = LoadRandomMaze();
          if (d != null) {
              console.log(d);
              socket.emit("load", d);
          } else {
              console.log("maze is null");
          }
          });

});


function LoadRandomMaze() {
    fs.readFile('Mazes.json', (err, data) => {
        if (err) throw err;
        let maze = JSON.parse(data);
        // console.log(maze);
        return maze;
    });
}
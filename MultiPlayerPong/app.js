var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

let check = false;
let canvas = {};
canvas.height = 600;
canvas.width = 1050;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});

io.on('connection', function (socket) {
    socket.on('disconnect', function () {
        console.log('user disconnected');

    });
    if (speler1.id == null) {
        speler1.id = socket.id;
    }
    else if (speler2.id == null) {
        speler2.id = socket.id;
    }
    socket.on("mousemove", function (y) {
        if (socket.id == speler1.id) {
            speler1.y = y;
        }
        else if (socket.id == speler2.id) {
            speler2.y = y;
        }

    });
    socket.emit("setup", spelerheight, spelerwidth, speler1.x, speler2.x, ball.y, ball.x, ball.radius);

    function updates() {
        for (let i = 0; i < ball.speed; i++) {
            //bovenkant en onderkant muur collision
            if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
                ball.speedY = -ball.speedY;
            }
            //speler collision
            if (ball.x + ball.radius >= speler2.x && ball.y - ball.radius <= speler2.y + spelerheight && ball.y + ball.radius >= speler2.y) {
                ball.speedX = - ball.speedX;
            }
            if (ball.x - ball.radius <= speler1.x + spelerwidth && ball.y - ball.radius <= speler1.y + spelerheight && ball.y + ball.radius >= speler1.y) {
                ball.speedX = - ball.speedX;
            }
            //score
            if (ball.x - ball.radius <= speler1.x + spelerwidth - 1) {
                ball.x = canvas.width / 2;
                ball.y = canvas.height / 2;
                ball.speedX = -ball.speedX;
                speler2.score += 1;
            }
            if (ball.x + ball.radius >= speler2.x + 1) {
                ball.x = canvas.width / 2;
                ball.y = canvas.height / 2;
                ball.speedX = -ball.speedX;
                speler1.score += 1;
            }
            ball.x += ball.speedX;
            ball.y += ball.speedY;

            socket.emit("updatevars", speler1.y, speler2.y, ball.x, ball.y, speler1.score, speler2.score);

            if (speler1.id == null && speler2.id == null) { timecheck = false; }
        }
    }
       setInterval(updates, 20);
});
//
spelerheight = 150;
spelerwidth = 25;
//#region
//#region 
let speler1 = {};
speler1.x = 10;
speler1.y = 0;
speler1.score = 0;
speler1.id = null;
speler1.updating = false;
//#endregion
//#region 
let speler2 = {};
speler2.x = canvas.width - spelerwidth - 20;
speler2.y = 0;
speler2.score = 0;
speler2.id = null;
//#endregion
//#region 
let ball = {};
ball.x = canvas.width / 2;
ball.y = canvas.height / 2;
ball.speed = 20;
ball.radius = 20;
ball.speedX = -0.3;
ball.speedY = -0.1;
//#endregion
//#endregion
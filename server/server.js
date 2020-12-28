const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const socketIO = require('socket.io');
const router = require('./router');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
});

const PORT = 3001
const server = app.listen(PORT, function (req, res) {
    console.log(`running on port ${PORT}`);
});



const Game = require('./Game/Game')
const p1 = { id: 1, name: "roi" }
const p2 = { id: 2, name: "shir" }
const p3 = { id: 3, name: "Messi" }
const p4 = { id: 4, name: "ronaldo" }

const game = new Game()
game.playerEnterToQueue(p1)
game.playerEnterToQueue(p2)
game.playerEnterToQueue(p3)
game.playerEnterToQueue(p4)
game.gameStart();

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('user is connected');
    socket.emit("hello", "world");
    socket.on('disconnect', () => {
        console.log('user has left');
    })
});
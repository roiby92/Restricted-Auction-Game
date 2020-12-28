const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const PORT = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    next();
});

const server = app.listen(PORT, function (req, res) {
    console.log(`running on port ${PORT}`);
});

const Game = require('./Game/Game');
const game = new Game();
const io = socketIO(server);
let playerId = 0;
io.on('connection', (socket) => {
    console.log('Player is connected');

    socket.emit('game', game);
    socket.on('initItems', () => {
        game.dealer.initItemsList()
        // game.getItemList()
    })
    socket.on('addQueue', (name) => {
        let player = { id: ++playerId, name: name }
        game.playerEnterToQueue(player)
    })

    socket.on('disconnect', () => {
        console.log('Player has left');
    });
});
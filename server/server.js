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

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('user is connected');
    socket.emit("hello", "world");
    socket.on('disconnect', () => {
        console.log('user has left');
    })
});
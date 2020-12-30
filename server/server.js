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
const Queue = require('./Game/Queue');
const Player = require('./Player/Player');

const playersQueue = new Queue();
const playersList = [];
const io = socketIO(server);
const game = new Game()

let playerId = 0;
let sale;

io.on('connection', (socket) => {

    socket.on('enter', (name) => {
        let player = new Player(++playerId, name)
        playersQueue.enqueue(player)
        socket.emit("player", player)
        if (!game.getGameStatus()) {
            game.setUpNewGame()
            while (!playersQueue.isEmpty()) {
                const playerSocket = playersQueue.dequeue()
                playerSocket.setBudget(game.dealer.totalPrice)
                socket.emit('player', playerSocket)
                playersList.push(playerSocket)
                socket.emit("palyers", playersList)
            }
            game.gameStart()
            debugger;
            console.log(game, 'game 2nd');
            if (game.round != game.dealer.N && playersList.length > 0) {
                sale = game.sellItem(game.dealer.itemsList[game.round], socket);
                console.log(sale, "salerrrrr");
                socket.on('offer', (bid) => {
                    const newTimer = game.setBestBid(bid)
                    console.log(newTimer);
                    if (newTimer) {
                        console.log(game.dealer.itemsList[game.round]);
                        sale = game.sellItem(game.dealer.itemsList[game.round], socket);
                    }
                    else {
                        const winingBid = game.nextSale();
                        const playerWon = playersList.find(p => winingBid.player.id === p.id)
                        console.log(playerWon);
                        if (playerWon) {
                            playerWon.playerPurchaseItem(winingBid)
                        }
                    }
                })
            }
            else {
                console.log('gameOVERRRRRRRRRR');
                game.gameOver();
                console.log(game);
            }

        }
        else {
            console.log(player);
            socket.emit("PQ", { player, massege: 'Player Enter To Queue' }) // PQ => Players Oueue
        }

        socket.on('disconnect', (id) => {
            const playerIndex = playersList.findIndex(player => player.id === id);
            if (playerIndex !== -1) {
                return playersList.splice(playerIndex, 1)[0];
            }
            console.log('Player has left');
        });
    });
});


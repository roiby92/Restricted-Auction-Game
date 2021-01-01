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
const game = new Game();

let playerId = 0;
let interval, sale;

io.on('connection', (socket) => {

    socket.on('enter', (name) => {
        // Player Enter To The Game
        let player = new Player(++playerId, name);
        playersQueue.enqueue(player);
        // Start New Game 
        if (!game.getGameStatus()) {
            socket.on('startGame', () => {
                game.gameStart();
                while (!playersQueue.isEmpty()) {
                    const player = playersQueue.dequeue();
                    player.setBudget(game.dealer.totalPrice);
                    playersList.push(player);
                    console.log(playersList);
                    socket.emit("palyersList", playersList);
                };
                socket.emit('start', game)
                sale = sellItem(game.getCurrentItem(), socket);
            });
            socket.on('offer', (bid) => {
                console.log(bid);
                // const newBidsList = game.setBestBid(bid);
                // if (newBidsList) {
                //     //socket.emit('newBidsList', newBidsList);
                // };
                clearInterval(interval);
                sale = sellItem(game.getCurrentItem(), socket);
            });
        }
        else {
            console.log(player);
            socket.emit("playersQueue", playersQueue);
        };
        socket.on('disconnect', (id) => {
            const playerIndex = playersList.findIndex(player => player.id === id);
            if (playerIndex !== -1) {
                socket.emit("playerLeave", playerIndex)
                return playersList.splice(playerIndex, 1);
            }
            else {
                while (!playersQueue.isEmpty()) {
                    const player = playersQueue.dequeue();
                    if (player.id != id) {
                        playersQueue.enqueue(player)
                        socket.emit("playersQueue", playersQueue);
                    };
                };
            };
            console.log('Player has left', playerIndex);
        });
    });
});


const sellItem = (item, socket) => {
    let counter = 10;
    return setTimeout(() => {
        interval = setInterval(() => {
            socket.emit('time', `${counter} time left`);
            socket.emit('item', item);
            console.log(item);
            console.log(counter);
            counter--
            nextSale(counter, socket);
        }, 1000);
    }, counter);
};

const nextSale = (counter, socket) => {
    if (counter < 0) {
        if (checkGame(socket)) {
            const winningBid = game.getWinningBid();
            if (winningBid) {
                const player = playersList.find(player => player.id === winningBid.id);
                player.playerPurchaseItem(winningBid);
                game.dealer.itemSold(winningBid);
                return winningBid, sale = sellItem(game.getCurrentItem(), socket);
            };
            game.incRound();
            game.resetBids();
            game.setCurrentItem()
            socket.emit('updateGame', game)
            clearInterval(interval);
            return sale = sellItem(game.getCurrentItem(), socket);
        };
    };
};

const checkGame = (socket) => {
    if (game.round === game.dealer.N && playersList.length > 0) {
        const gameWinner = getGameWinner();
        socket.emit('winner', gameWinner);
        clearInterval(interval);
        clearTimeout(sale);
        game.gameOver();
        game.gameStart();
        setTimeout(()=>{
            socket.emit('start', game)
            sale = sellItem(game.getCurrentItem(), socket);
        },5000)
        return false;
    }
    if (playersList.length === 0) {
        clearInterval(interval);
        clearTimeout(sale)
        game.gameOver();
        return false;
    };
    return true;
};

const getGameWinner = () => {
    let winner = playersList[0]
    for (let player in playersList) {
        if (player.budget > winner.budget) {
            winner = player
        };
    };
    return console.log(winner);;

    
};
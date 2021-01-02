const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const PORT = 3001;
const Actions = require('./playersActions');

const Game = require('./Game/Game');
const Player = require('./Player/Player');

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


const playersList = []
const playersActions = Actions(playersList);

const io = socketIO(server);
const game = new Game();
let interval, sale;

io.on('connection', (socket) => {

    socket.on('join', (name) => {
        let player = new Player(socket.id, game.room, name);
        playersActions.addPlayer(player)
        socket.join(player.room)
        io.to(game.room).emit('playerEnterGameMsg', `${player.playerName} enter to The Game Room`);
        io.to(game.room).emit("newPlayer", player);

        if (!game.getGameStatus()) {
            game.gameStart();
            playersActions.setBudget(game.getTotalPrice())
            io.to(game.room).emit('newBudget', game.getTotalPrice())
            io.to(game.room).emit('startGameMsg', `Game Is starting wit ${playersList.length} players, total items values of $ ${game.getTotalPrice()}`);
            sale = sellItem(socket);
        };
        io.to(game.room).emit('game', game)
    });

    socket.on('offer', (bid) => {
        console.log(socket.id)
        const player = playersActions.findPlayer(socket.id)
        console.log(player,"RRRRRR");
        const newBid = {
            playerId: player.id,
            bidPrice: parseInt(bid),
            item: game.getCurrentItem()
        };
        const newBidsList = game.setBestBid(newBid);
        if (newBidsList) {
            io.to(game.room).emit('playerBidMsg', `${player.playerName} Submitted a $ ${newBid.price} bid on ${newBid.item.name}`);
            console.log(newBidsList);
            clearInterval(interval);
            clearTimeout(sale)
            return sale = sellItem(socket);
        };
    });

    socket.on('disconnect', () => {
        const playerRemoved = playersActions.removePlayer(socket.id);
        if (playerRemoved) {
            // console.log(`${player.name} Left the game room`);
            io.to(game.room).emit('playerLeave', playerRemoved.id);
            io.to(game.room).emit('playerLeaveMsg', `Player ${playerRemoved.playerName} Left the game room`);
        };
        if (playersActions.getLength() === 0) {
            game.gameOver();
            clearInterval(interval);
            clearTimeout(sale)
        }
    });
});

const sellItem = () => {
    let counter = 18;
    return setTimeout(() => {
        interval = setInterval(() => {
            io.to(game.room).emit('time', `${counter} time left`);

            counter--
            nextSale(counter);
        }, 1000);
    }, counter);
};
const nextSale = (counter, socket) => {
    if (counter < 0) {
        if (checkGame(socket)) {
            const winningBid = game.getWinningBid();
            if (winningBid) {
                const player = playersActions.findPlayer(winningBid.playerId);
                player.playerPurchaseItem(winningBid);
                io.to(game.room).emit('winningBid',winningBid );
                io.to(game.room).emit('winningBidMsg', `${player.playerName} has Purchased ${winningBid.item.name} for a ${winningBid.bidPrice} , Your are very lucky`);
                game.dealer.itemSold(winningBid);
            };
            game.nextRound();
            game.resetBids();
            game.setCurrentItem();
            clearInterval(interval);
            return sale = sellItem(socket);
        };
        clearInterval(interval);
        clearTimeout(sale)
        game.gameOver();
        io.to(game.room).emit("game", game);
    };
};

const checkGame = () => {
    if (game.round === game.dealer.N) {
        console.log('NEW GAMEEEEEW');
        const gameWinner = playersActions.getGameWinner();
        console.log(gameWinner);
        io.to(game.room).emit('winner', gameWinner);
        clearInterval(interval);
        clearTimeout(sale);
        game.gameOver();
        game.gameStart();
        io.to(game.room).emit('newBudget', game.getTotalPrice())
        setTimeout(() => {
            io.to(game.room).emit('start', game)
            sale = sellItem();
        }, 7000);
        return false;
    };
    if (playersActions.getLength() === 0) {

        return false;
    };
    return true;
};


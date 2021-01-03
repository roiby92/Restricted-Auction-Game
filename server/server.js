const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const PORT = 3001;
const Game = require('./Game/Game');
const Player = require('./Player/Player');
const cors = require('cors')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

const server = app.listen(PORT, function (req, res) {
    console.log(`running on port ${PORT}`);
});



const io = socketIO(server);
const game = new Game(io);
let interval, sale;

io.on('connection', (socket) => {

    socket.on('join', (name) => {
        let player = new Player(socket.id, game.room, name);
        game.addPlayer(player)
        socket.join(player.room)
        game.messages.push(`${player.playerName} enter to The Game Room`)

        if (!game.getGameStatus()) {
            game.gameStart();
            io.to(game.room).emit('game', game)
            sale = sellItem(socket);
        };
    });

    socket.on('offer', (bid) => {
        const player = game.findPlayer(socket.id)
        if (player.budget > 0) {
            const newBid = {
                playerId: player.id,
                bidPrice: parseInt(bid),
                item: game.getCurrentItem()
            };
            const newBidsList = game.setBestBid(newBid);
            if (newBidsList) {
                game.messages.push(`${player.playerName} Submitted a $ ${newBid.bidPrice} bid on ${newBid.item.name}`)
                clearInterval(interval);
                clearTimeout(sale)
                return sale = sellItem();
            };
        }
        else {
            game.addMessage(`${player.playerName} Youe cannot bid at the moment, your budget is 0, white for next game`)
        }
    });

    socket.on('disconnect', () => {
        const playerRemoved = game.removePlayer(socket.id);
        if (playerRemoved) {
            game.messages.push('playerLeaveMsg', `Player ${playerRemoved.playerName} Left the game room`)
        };
        if (game.players.length === 0) {
            game.gameOver();
            clearInterval(interval);
            clearTimeout(sale)
        }
        io.to(game.room).emit('game', game)
    });
});

const sellItem = () => {
    let counter = 10;
    return setTimeout(() => {
        interval = setInterval(() => {
            io.to(game.room).emit('time', `There are ${counter} seconds left in this current round `);
            io.to(game.room).emit('game', game)
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
                console.log(winningBid);
                const player = game.findPlayer(winningBid.playerId);
                player.playerPurchaseItem(winningBid);
                game.dealer.itemSold(winningBid);
                game.messages.push(`${player.playerName} has Purchased ${winningBid.item.name} for a ${winningBid.bidPrice} , Your are very lucky`)
                io.to(game.room).emit('game', game);
            };
            game.nextRound();
            game.resetBids();
            game.setCurrentItem();
            clearInterval(interval);
            return sale = sellItem();
        };
        clearInterval(interval);
        clearTimeout(sale)
        game.gameOver();
        game.gameStart();
        return sale = sellItem();
    };
};

const checkGame = () => {
    if (game.round === game.dealer.N) {
        console.log('NEW GAMEEEEEW');
        const gameWinner = game.getGameWinner();
        game.messages.push(`The Game Winner Is ${gameWinner.playerName}`)
        io.to(game.room).emit('game', game);
        clearInterval(interval);
        clearTimeout(sale);
        return false;
    };
    return true;
};


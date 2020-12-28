const Dealer = require('../Dealer/Dealer');
const Player = require('../Player/Player')
const Queue = require('./Queue');

class Game {
    constructor() {
        this.dealer = new Dealer();
        this.players = []
        this.playersQueue = new Queue();
        this.isRun = false;
        this.warFactor = 0.01;
    }

    playerEnterToQueue = player => {
        console.log(player);
        this.playersQueue.enqueue(player)
        return this.playersQueue
    };

    playerLeaveGame = id => {
        const playerIndex = this.players.findIndex(player => player.id === id);
        if (playerIndex !== -1) {
            return this.players.splice(playerIndex, 1)[0];
        }
    }

    initPlayersList = () => {
        if (this.isRun) {
            return console.log('white until game will finish');
        }
        this.dealer.initItemsList();
        while (!this.playersQueue.isEmpty()) {
            let player = this.playersQueue.dequeue()
            player["budget"] = this.dealer.totalBudget;
            this.players.push(new Player(player));
        }
        return this.players
    }

    playerBet = (itemName, itemPrice, player, betAmaount) => {
        if (betAmaount < itemPrice / 2) {
            return false
        }
        return { ...player, betAmaount, itemName }
    }

    checkWarFactor = (item, bets) => {
        if (this.players.lenght > 2 && bets * 2 >= this.players.length) {
            return item.price = item.price * (bets / this.players.length) * this.warFactor;
        }
        return false;
    }

    gameStart = () => {
        this.initPlayersList();
        let round = this.dealer.itemsList.length;
        const bets = []
        for (let i = 0; i < this.dealer.itemsList.length; i++) {
            console.log(`item for sael is ${this.dealer.itemsList[i].name}\n total cost of ${this.dealer.itemsList[i].price}
            \n Start Bett`);
            round--
            if (this.gameOver(round)) {
                break;
            }
        }
    }
    gameOver = (round) => {
        if (this.dealer.itemsList.length === 0 || round === 0) {
            return this.isRun = false, console.log('the game is overrrrr'), true;
        }
        else return false;
    }

    getItemList = () => {
        return this.dealer.itemsList
    }
}

module.exports = Game;
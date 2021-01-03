const Dealer = require('../Dealer/Dealer');
const dealerConfig = require('../../Dealer.config.json');

class Game {
    constructor() {
        this.dealer = new Dealer()
        this.room = '1'
        this.isRun = false
        this.players = []
        this.messages = []
        this.currentItem = null
        this.gameNumer = 0
        this.round = 1
        this.bidsPerRound = 0
        this.bids = []
        this.bidsPerRound = 0
    };

    addPlayer = player => {
        this.players.push(player);
        console.log(this.players);
    };
    removePlayer = (id) => {
        const index = this.players.findIndex((user) => user.id === id);
        if (index !== -1) return this.players.splice(index, 1)[0];
    };

    findPlayer = (id) => this.players.find((player) => player.id === id);

    getGameWinner = () => {
        let winner = this.players[0]
        for (let player in this.players) {
            if (player.budget > winner.budget) {
                winner = player
            };
        };
        return winner;
    }
    setBudget = () => {
        this.players.forEach(p => {
            p.budget = this.getTotalPrice()
            console.log(p);
        });
    };

    getPlayers = (room) => this.players.filter(player => player.room === room);

    gameStart = () => {
        this.isRun = true;
        this.gameNumer++;
        this.dealer.initItemsList();
        this.setBudget()
        this.setCurrentItem();
        this.messages.push(`Game Number ${this.gameNumer} Is starting wit ${this.players.length} players, total items values of $ ${this.getTotalPrice()}`)
    };
    newGame = () => {
        this.currentItem = null;
        this.round = 1;
        this.bids = [];
    };
    gameOver = () => {
        this.dealer.resetData();
        this.isRun = false;
        this.currentItem = null;
        this.round = 1;
        this.bids = [];
        this.messages = []
        this.numberOfPlayers = 0;
        console.log("gameIsOver");
    };
    nextRound = () => {
        this.round += 1;
        this.bidsPerRound = 0
    }
    getGameStatus = () => this.isRun;
    getItemList = () => this.dealer.itemsList
    getTotalPrice = () => this.dealer.totalPrice;
    getCurrentItem = () => this.currentItem;
    getWinningBid = () => {
        if (this.bids.length === 1) {
            return this.bids[0];
        }
        return false;
    };
    setCurrentItem = () => this.currentItem = this.dealer.itemsList[this.round - 1];
    resetBids = () => this.bids = [];

    setBestBid = (bid) => {
        if (this.bids.length === 0) {
            this.bids.push(bid);
            this.bidsPerRound++
            this.checkWarFactoe()
            return true
        }
        else if (bid.bidPrice > this.bids[0].bidPrice) {
            this.resetBids();
            this.bids.push(bid);
            this.bidsPerRound++
            this.checkWarFactoe()
            return true
        }
        else if (bid.bidPrice === this.bids[0].bidPrice) {
            this.bids.push(bid);
            this.bidsPerRound++
            this.checkWarFactoe()
            return true
        }
        else if (bid.bidPrice < this.bids[0].bidPrice) {
            return false
        };
    };

    checkWarFactoe = () => {
        if (this.players.length > 2 && this.bidsPerRound / 2 > this.players.length) {
            console.log(this.currentItem.price);
            this.currentItem[price] = this.currentItem[price] * (thisbidsPerRound / this.players.length) * dealerConfig.warFactor;

            return true
        }
        return false;
    }

    addMessage = (msg) => {
        this.messages.push(msg)
    }


};
module.exports = Game;
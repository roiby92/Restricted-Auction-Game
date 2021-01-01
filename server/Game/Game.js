const Dealer = require('../Dealer/Dealer');
const dealerConfig = require('../Dealer/Dealer.config');

class Game {
    constructor() {
        this.dealer = new Dealer()
        this.isRun = false
        this.currentItem = null
        this.round = 1
        this.bids = []
        this.numberOfPlayers = 0
    };

    gameStart = () => {
        this.isRun = true;
        this.dealer.initItemsList();
        this.setCurrentItem();
    };
    gameOver = () => {
        this.dealer.resetData();
        this.isRun = false;
        this.currentItem = null;
        this.round = 1;
        this.bids = [];
        this.numberOfPlayers = 0;
    };
    incRound = () => this.round += 1;
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
        }
        else if (bid.price > this.bids[0].price) {
            this.resetBids();
            this.bids.push(bid);
        }
        else if (bid.price === this.bids[0].price) {
            this.bids.push(bid);
        }
        else if (bid.price < this.bids[0].price) {
            return false
        };
        return this.bids;
    };
};
module.exports = Game;
const Dealer = require('../Dealer/Dealer');
const dealerConfig = require('../Dealer/Dealer.config');

class Game {
    constructor() {
        this.dealer = new Dealer()
        this.room = '1'
        this.isRun = false
        this.currentItem = null
        this.round = 1
        this.bidsPerRound = 0
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
        console.log("gameIsOver");
    };
    nextRound = () => this.round += 1;
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
            return true
        }
        else if (bid.bidPrice > this.bids[0].bidPrice) {
            this.resetBids();
            this.bids.push(bid);
            this.bidsPerRound++
            return true
        }
        else if (bid.bidPrice === this.bids[0].bidPrice) {
            this.bids.push(bid);
            this.bidsPerRound++
            return true
        }
        else if (bid.bidPrice < this.bids[0].bidPrice) {
            return false
        };
    };

    checkWarFactoe = (players) => {
        if (this.bidsPerRound > players * 2) {
            this.currentItem.price = this.currentItem.price * (bidsPerRound / players) * dealerConfig.warFactor;
            return true
        }
        return false;
    }
};
module.exports = Game;
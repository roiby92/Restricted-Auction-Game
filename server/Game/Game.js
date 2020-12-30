const Dealer = require('../Dealer/Dealer');
const Player = require('../Player/Player')

class Game {
    constructor() {
        this.dealer = new Dealer()
        this.numberOfPlayers = 0
        this.isRun = false
        this.round = 0
        this.bids = []
        this.interval
        this.warFactor = 0.01
    }
    getGameStatus = () => {
        return this.isRun
    }

    gameStart = () => {
        this.isRun = true;
    }
    gameOver = () => {
        this.isRun = false
    }
    getItemList = () => {
        return this.dealer.itemsList
    }
    getTotalPrice = () => {
        return this.dealer.totalPrice;
    }
    incRound = () => {
        this.round += 1
    }
    setUpNewGame = () => {
        this.dealer.initItemsList();
    }
    resetBids = () => {
        this.bids = []
    }
    setBestBid = (bid) => {
        if (!this.bids[0]) {
            this.bids.push(bid)
        }
        else if (bid.price > this.bids[0].price) {
            this.resetBids()
            this.bids.push(bid)
            return true
        }
        else if (bid.price === this.bids[0].price) {
            this.bids.push(bid)
            return true
        }
        else {
            return false
        }
    }

    sellItem = (item, socket) => {
        let counter = 10;
        return setTimeout(() => {
            this.interval = setInterval(() => {
                console.log(item);
                console.log(counter);
                socket.emit('time', `${counter} time left`)
                socket.emit('item', item)
                counter--
                if (counter < 0) {
                    return this.nextSale()
                }
            }, 1000)
        }, counter)
    }

    nextSale = () => {
        this.incRound()
        if (this.bids.length != 1) {
            this.resetBids()
            return clearInterval(this.interval), false
        }
        else {
            const winingBid = this.bids[0]
            console.log(winingBid);
            clearInterval(this.interval)
            return winingBid
        }
    }
}


module.exports = Game;
const dealerConfig = require('./Dealer.config')

class Dealer {
    constructor() {
        this.N = 0
        this.itemsList = [];
        this.totalPrice = 0; 
    };

    checkValidity = (number) => {
        if (isNaN(number)) {
            return console.log('invalid value, must be integer server/Player/Player.js line 11');
        };
        return true;
    };

    numberOfItems = () => {
        if (this.checkValidity(dealerConfig.n) && this.checkValidity(dealerConfig.m)) {
            console.log(this.N);
            while (this.N < dealerConfig.n) {
                this.N= Math.floor(Math.random() * dealerConfig.m) + 1;
                console.log(this.N);
            };
            return this.N;
        }
        return console.log('Opps, somthing went wrong server/Player/Player.js line 25');
    };

    randomPrice = () => {
        if (this.checkValidity(dealerConfig.x) && this.checkValidity(dealerConfig.y)) {
            let itemValue = 0;
            while (itemValue < dealerConfig.x) {
                itemValue = Math.floor(Math.random() * dealerConfig.y) + 1;
            };
            this.totalPrice += itemValue;
            return itemValue;
        };
        return console.log('Opps, somthing went wrong => server/Player/Player.js line 37');
    };

    initItemsList = () => {
        this.numberOfItems()
        for (let i = 1; i < this.N + 1; i++) {
            let itemPrice = this.randomPrice()
            console.log(`item${i} =  $${itemPrice}`);
            this.itemsList.push({ name: `item${i}`, price: itemPrice });
        };
    };

    getTotalPrice=()=>{
        return this.totalPrice;
    }

    getN=()=>{
        return this.N;
    }
};

module.exports = Dealer;



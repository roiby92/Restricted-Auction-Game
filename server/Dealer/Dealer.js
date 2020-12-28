const dealerConfig = require('./Dealer.config')

class Dealer {
    constructor() {
        this.itemsList = [];
        this.totalBudget = 0;
    };

    checkValidity = (number) => {
        if (isNaN(number)) {
            return console.log('invalid value, must be integer');
        };
        return true;
    };

    numberOfItems = () => {
        console.log(dealerConfig);
        if (this.checkValidity(dealerConfig.n) && this.checkValidity(dealerConfig.m)) {
            let N = 0;
            while (N < dealerConfig.n) {
                N = Math.floor(Math.random() * dealerConfig.m) + 1;
            };
            return N;
        }
        return console.log('Opps, somthing went wrong');
    };

    randomPrice = () => {
        if (this.checkValidity(dealerConfig.x) && this.checkValidity(dealerConfig.y)) {
            let itemValue = 0;
            while (itemValue < dealerConfig.x) {
                itemValue = Math.floor(Math.random() * dealerConfig.y) + 1;
            };
            this.totalBudget += itemValue;
            return itemValue;
        };
        return console.log('Opps, somthing went wrong');
    };

    initItemsList = () => {
        let N = this.numberOfItems()
        console.log(N);
        for (let i = 1; i < N + 1; i++) {
            let itemPrice = this.randomPrice()
            console.log(`item${i} =  $${itemPrice}`);
            this.itemsList.push({ name: `item${i}`, price: itemPrice });
        };
    };
};

module.exports = Dealer;



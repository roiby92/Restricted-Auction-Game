const dealerConfig = require('./Dealer.config')
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function Dealer() {
    const itemsList = []

    const checkValidity = (number) => {
        if (isNaN(number)) {
            return console.log('invalid value, must be integer');
        }
        return true;
    }

    const numberOfItems = () => {
        console.log(dealerConfig);
        if (checkValidity(dealerConfig.n) && checkValidity(dealerConfig.m)) {
            let N = 0
            while (N < dealerConfig.n) {
                N = Math.floor(Math.random() * dealerConfig.m) + 1;
            }
            return N
        }
        return console.log('Opps, somthing went wrong');
    }

    const randomPrice = () => {
        if (checkValidity(dealerConfig.x) && checkValidity(dealerConfig.y)) {
            let itemValue = 0
            while (itemValue < dealerConfig.x) {
                itemValue = Math.floor(Math.random() * dealerConfig.y) + 1
            }
            return '$ ' + itemValue
        }
        return console.log('Opps, somthing went wrong');
    }

    const initItemsList = async () => {
        let N = numberOfItems()
        console.log(N);
        for (let i = 1; i < N + 1; i++) {
            let itemPrice = randomPrice()
            console.log(`item${i} =  ${itemPrice}`);
            itemsList.push({ id: `item${i}`, price: itemPrice })
        }
    }

    return {
        initItemsList
    }
}


module.exports = Dealer;










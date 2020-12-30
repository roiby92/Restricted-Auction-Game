class Player {
    constructor(id, name) {
        this.id = id;
        this.playerName = name;
        this.budget = 0;
        this.itemsPurchased = [];
    };

    setBudget = (budget) => {
        this.budget = budget
    }

    playerPurchaseItem = (bid) => {
        this.budget -= bid.price;
        this.itemsPurchased.push(bid);
    };

    playerDetails = () => {
        return console.log(this);
    };

}

module.exports = Player;
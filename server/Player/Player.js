class Player {
    constructor(id, name) {
        this.id = id;
        this.playerName = name;
        this.budget = 0;
        this.currentBid = null;
        this.itemsPurchased = [];
    };

    setBudget = budget => this.budget = budget;
    setCurrentBid = bid => this.currentBid = bid;
    resetCurrentBid = () => this.currentBid = null;
    playerDetails = () => console.log(this);

    playerPurchaseItem = (bid) => {
        this.budget -= bid.price;
        this.itemsPurchased.push(bid);
    };

}

module.exports = Player;
class Player {
    constructor(socketId, room, name) {
        this.id = socketId
        this.room = room
        this.playerName = name
        this.budget = 0
        this.currentBid = null
        this.itemsPurchased = []
    };

    setBudget = budget => this.budget = budget;
    setCurrentBid = bid => this.currentBid = bid;
    resetCurrentBid = () => this.currentBid = null;
    playerDetails = () => console.log(this);

    playerPurchaseItem = (bid) => {
        this.budget -= bid.bidPrice;
        this.itemsPurchased.push(bid.item);
        console.log(this.budget, this.itemsPurchased);
    };

};
module.exports = Player;
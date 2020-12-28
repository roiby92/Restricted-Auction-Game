class Player {
    constructor(player) {
        this.id = player.id;
        this.playerName = player.name;
        this.budget = player.budget;
        this.itemsPurchased = [];
    };

    playerBoughtItem(item, bet) {
        this.budget -= bet;
        this.itemsPurchased.push(item)
    };

    playerDetails() {
        return console.log(this);
    };

}

module.exports = Player;
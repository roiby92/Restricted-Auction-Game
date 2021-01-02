const playersActions = (players) => {
    const addPlayer = player => {
        players.push(player);
        console.log(players);
        return { player };
    };
    const removePlayer = (id) => {
        const index = players.findIndex((user) => user.id === id);
        if (index !== -1) return players.splice(index, 1)[0];
    };
    const findPlayer = (id) => players.find((user) => user.id === id);
    const getGameWinner = () => {
        let winner = players[0]
        for (let player in players) {
            if (player.budget > winner.budget) {
                winner = player
            };
        };
        return winner;
    };

    const setBudget = (budjet) => {
        players.forEach(p => {
            p.budget = budjet
            console.log(p);
        });
    };
    
    const getLength = () => players.length
    const getPlayers = (room) => players.filter(player => player.room === room);
    return { addPlayer, removePlayer, findPlayer, getGameWinner, getLength, setBudget,getPlayers };
};

module.exports = playersActions;
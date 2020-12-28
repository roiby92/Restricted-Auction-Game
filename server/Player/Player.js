function Player() {

    const playersList = [];

    // Join Player to Game
    function playerJoin(id, username) {
        const player = { id, username };
        playersList.push(player);

        return player;
    }

    // Get current player
    function getCurrentPlayer(id) {
        return playersList.find(palyer => palyer.id === id);
    }

    // User leaves chat
    function playerLeave(id) {
        const playerIndex = playersList.findIndex(user => user.id === id);

        if (playerIndex !== -1) {
            return playersList.splice(playerIndex, 1)[0];
        }
    }

    return {
        playerJoin,
        getCurrentPlayer,
        playerLeave
    }
}

module.exports = Player;
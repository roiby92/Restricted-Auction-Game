const gameAction = (game) => {

    const sellItem = (item, socket) => {
        let counter = 10;
        return setTimeout(() => {
            interval = setInterval(() => {
                socket.emit('time', `${counter} time left`);
                socket.emit('item', item);

                console.log(counter, item);
                counter--
                nextSale(counter, socket);
            }, 1000);
        }, counter);
    };

    const nextSale = (counter, socket) => {
        if (counter < 0) {
            if (checkGame(socket)) {
                const winningBid = game.getWinningBid();
                if (winningBid) {
                    const player = playersList.find(player => player.id === winningBid.id);
                    player.playerPurchaseItem(winningBid);
                    game.dealer.itemSold(winningBid);
                    return winningBid, sale = sellItem(game.getCurrentItem(), socket);
                };
                game.incRound();
                game.resetBids();
                game.setCurrentItem();
                socket.emit('updateGame', game);
                clearInterval(interval);
                return sale = sellItem(game.getCurrentItem(), socket);
            };
        };
    };

    const checkGame = (socket) => {
        if (game.round === game.dealer.N && playersList.length > 0) {
            const gameWinner = getGameWinner();
            socket.emit('winner', gameWinner);
            clearInterval(interval);
            clearTimeout(sale);
            game.gameOver();
            game.gameStart();
            initPlayersList(socket);
            setTimeout(() => {
                socket.emit('start', game)
                sale = sellItem(game.getCurrentItem(), socket);
            }, 5000);
            return false;
        };
        if (playersList.length === 0) {
            clearInterval(interval);
            clearTimeout(sale)
            game.gameOver();
            return false;
        };
        return true;
    };

    return {}

}
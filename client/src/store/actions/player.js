import * as actionsTypes from './actionTypes'
export const setPlayersList = playersList => {
    return {
        type: actionsTypes.PLAYER_ENTER,
        playersList
    };
};
export const playerLeave = playerIndex => {
    return {
        type: actionsTypes.PLAYER_LEAVE,
        playerIndex
    };
};
export const playerPurchaseItem = (player, item) => {
    return {
        type: actionsTypes.PLAYER_PURCHASED_ITEM,
        player,
        item
    };
};
import * as actionsTypes from './actionTypes'
export const addPlayerToList = player => {
    return {
        type: actionsTypes.PLAYER_ENTER,
        player
    };
};
export const playerLeave = playerId => {
    return {
        type: actionsTypes.PLAYER_LEAVE,
        playerId
    };
};

export const setBudget = budget => {
    return {
        type: actionsTypes.SET_PLAYER_BUDGET,
        budget
    };
}
export const playerPurchaseItem = (player, item) => {
    return {
        type: actionsTypes.PLAYER_PURCHASED_ITEM,
        player,
        item
    };
};
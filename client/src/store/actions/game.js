import * as actionsTypes from './actionTypes'
export const gameStart = game => {
    return {
        type: actionsTypes.START_GAME,
        game
    };
};
export const updateGame = game => {
    return {
        type: actionsTypes.UPDATE_GAME,
        game
    };
};
export const gameOver = () => { return { type: actionsTypes.GAME_OVER } };
export const setCurrentItem = item => {
    return {
        type: actionsTypes.SET_CURRENT_ITEM,
        item
    };
};
export const setTime = time => {
    return {
        type: actionsTypes.SET_TIME,
        time
    };
};
export const playerBid = bids => {
    return {
        type: actionsTypes.PLAYER_BID,
        bids
    };
};
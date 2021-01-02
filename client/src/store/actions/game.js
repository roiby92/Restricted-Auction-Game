import * as actionsTypes from './actionTypes'

export const updateGame = game => {
    return {
        type: actionsTypes.UPDATE_GAME,
        game
    };
};
export const gameOver = () => { return { type: actionsTypes.GAME_OVER } };

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
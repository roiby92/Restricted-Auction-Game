import * as actionsTypes from './actionTypes';

export const setPlayersQueue = playersQueue => {
    return {
        type: actionsTypes.PLAYER_ENTER_TO_QUEUE,
        playersQueue
    };
};
export const resetQueue = () => { return { type: actionsTypes.RESET_QUEUE } };
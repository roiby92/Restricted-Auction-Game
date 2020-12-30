import * as actionsTypes from './actionTypes'

export const queueChange = queue => {
    return {
        type: actionsTypes.PLAYER_ENTER,
        queue: queue
    }
};
export const setTime = (time) => {
    return {
        type: actionsTypes.SET_TIME,
        time
    }
}

export const playerLeaveGame = (id) => {
    return {
        type: actionsTypes.PLAYER_LEAVE,
        id,
    }
};

export const startGame = (index) => {
    return {
        type: actionsTypes.START_GAME,
        isRun: true,
    }
};

export const playerBet = (id, betAmaount, item) => {
    return {
        type: actionsTypes.PLAYER_BET,
        id,
        betAmaount,
        item

    }
}
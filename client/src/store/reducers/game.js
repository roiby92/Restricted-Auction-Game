import * as actionsTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initalState = {
    isRun: false,
    playersQueue: null,
    bets: [],
    time: null,
    currentItem: null
}

const gameStart = (state, action) => {
    return updateObject(state, { isRun: true })
}

const setTime = (state, action) => {
    return updateObject(state, { time: action.time })
}

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionsTypes.START_GAME: return gameStart(state, action);
        case actionsTypes.SET_TIME: return setTime(state, action);
        default: return state;
    }
};

export default reducer;
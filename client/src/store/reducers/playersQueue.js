import * as actionsTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    playersQueue: []
}

const setPlayersQueue = (state, action) => updateObject(state, { playersQueue: action.playersQueue });
const resetQueue = (state) => updateObject(state, { playersQueue: [] });

const playersQueueReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.PLAYER_ENTER_TO_QUEUE: return setPlayersQueue(state, action);
        case actionsTypes.RESET_QUEUE: return resetQueue(state, action);
        default: return state;
    };
};
export default playersQueueReducer;
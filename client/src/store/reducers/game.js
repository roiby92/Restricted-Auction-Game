import * as actionsTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    dealer: null,
    room: null,
    isRun: false,
    currentItem: null,
    round: null,
    messages:null,
    bids:null,
    numOfPlayers: 0,
    time: null
};
const addMessage = (state, action) => updateObject(state, { messeges: state.messeges.concat(action.messege) });
const updateGame = (state, action) => updateObject(state, action.game)
const gameOver = state => updateObject(state, initialState);
const setTime = (state, action) => updateObject(state, { time: action.time });

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.UPDATE_GAME: return updateGame(state, action);
        case actionsTypes.GAME_OVER: return gameOver(state);
        case actionsTypes.SET_TIME: return setTime(state, action);
        case actionsTypes.ADD_MESSAGE: return addMessage(state, action)
        default: return state;
    };
};
export default gameReducer;
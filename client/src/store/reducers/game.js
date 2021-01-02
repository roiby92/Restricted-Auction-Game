import * as actionsTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    dealer: null,
    room:null,
    isRun: false,
    currentItem: null,
    round: null,
    bids: [],
    numOfPlayers: 0,
    time: null
};

const updateGame = (state, action) => updateObject(state, action.game)
const gameOver = state => updateObject(state, initialState);
const setTime = (state, action) => updateObject(state, { time: action.time });
const playerBid = (state, action) => updateObject(state, { bids: action.bids });

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.UPDATE_GAME: return updateGame(state, action);
        case actionsTypes.GAME_OVER: return gameOver(state);
        case actionsTypes.SET_TIME: return setTime(state, action);
        case actionsTypes.PLAYER_BID: return playerBid(state, action);
        default: return state;
    };
};
export default gameReducer;
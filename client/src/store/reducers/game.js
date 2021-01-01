import * as actionsTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    dealer: null,
    isRun: false,
    currentItem: null,
    round: null,
    bids: [],
    numOfPlayers: 0,
    time: null
};

const gameStart = (state, action) => updateObject(state, action.game);
const updateGame = (state, action) => updateObject(state, action.game)
const gameOver = state => updateObject(state, initialState);
const setTime = (state, action) => updateObject(state, { time: action.time });
const resetBids = (state) => updateObject(state, { bids: [] });
const playerBid = (state, action) => updateObject(state, { bids: action.bids });
const setCurrentItem = (state, action) => updateObject(state, { currentItem: action.currentItem });

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.START_GAME: return gameStart(state, action);
        case actionsTypes.UPDATE_GAME: return updateGame(state, action);
        case actionsTypes.GAME_OVER: return gameOver(state);
        case actionsTypes.SET_TIME: return setTime(state, action);
        case actionsTypes.SET_CURRENT_ITEM: return setCurrentItem(state, action);
        case actionsTypes.RESET_BIDS: return resetBids(state);
        case actionsTypes.PLAYER_BID: return playerBid(state, action);
        default: return state;
    };
};
export default gameReducer;
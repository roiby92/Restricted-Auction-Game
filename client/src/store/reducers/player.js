import * as actionsTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    playersList: []
};

const setPlayersList = (state, action) => updateObject(state, { playersList: action.playersList });
const playerLeave = (state, action) => updateObject(state, { playersList: state.playersList.splice(action.playerIndex, 1) });
const playerPurchaseItem = (state, action) => {
    const player = state.players.find(p => p.id === action.player.id);
    player.itemsPurchased.concat(action.item);
    return state;
};

const playersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.PLAYER_ENTER: return setPlayersList(state, action);
        case actionsTypes.PLAYER_LEAVE: return playerLeave(state, action);
        case actionsTypes.PLAYER_PURCHASED_ITEM: return playerPurchaseItem(state, action);
        default: return state;
    };
};
export default playersReducer;
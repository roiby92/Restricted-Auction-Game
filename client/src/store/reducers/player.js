import * as actionsTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    players: [],
};

const addPlayerToList = (state, action) =>{
    console.log(action.player);
    return updateObject(state, { players: state.players.concat(action.player) });
} 

const playerLeave = (state, action) => {
    const playerIndex = state.players.findIndex(p => p.id === action.playerId)
    console.log(playerIndex);
    updateObject(state, { playersList: state.players.splice(playerIndex, 1) });
}

const playerPurchaseItem = (state, action) => {
    const player = state.players.find(p => p.id === action.player.id);
    player.itemsPurchased.concat(action.item);
    return state;
};

const setBudget = (state, action) => {
    const playersCopy = [...state.players]
    playersCopy.forEach(p => p.budget = action.budget)
    return updateObject(state, { players: playersCopy })
};

const playersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.PLAYER_ENTER: return addPlayerToList(state, action);
        case actionsTypes.PLAYER_LEAVE: return playerLeave(state, action);
        case actionsTypes.SET_PLAYER_BUDGET: return setBudget(state, action);
        case actionsTypes.PLAYER_PURCHASED_ITEM: return playerPurchaseItem(state, action);
        default: return state;
    };
};
export default playersReducer;
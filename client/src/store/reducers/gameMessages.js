import * as actionsTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState ={
    messeges:[]
};

const addMessage = (state, action) => updateObject(state, { messeges: state.messeges.concat(action.messege) });
const resetMessages = (state, action) => updateObject(state, { messeges: [] });

const gameMessagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.ADD_MESSAGE: return addMessage(state, action);
        case actionsTypes.RESET_MESSAGES: return resetMessages(state, action);
        default: return state;
    };
};
export default gameMessagesReducer;
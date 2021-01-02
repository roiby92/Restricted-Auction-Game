import * as actionsTypes from './actionTypes';
export const addMessage = messege => {
    return {
        type: actionsTypes.ADD_MESSAGE,
        messege
    };
};
export const resetMessages = () => {
    return {
        type: actionsTypes.RESET_MESSAGES
    };
};
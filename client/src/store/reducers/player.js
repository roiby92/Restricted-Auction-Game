import * as actionsTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const users = (state = {}, action) => {
    switch (action.type) {
        case actionsTypes.PLAYER_ENTER: return updateObject(state, action.player)
        case actionsTypes.PLAYER_BET:
            return action.users
        default:
            return state
    }
}

export default users
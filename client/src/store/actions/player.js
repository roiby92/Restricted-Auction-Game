import * as actionsTypes from './actionTypes'




export const PlayerEnter = player => {
    return {
        type: actionsTypes.PLAYER_ENTER,
        player
    }


}
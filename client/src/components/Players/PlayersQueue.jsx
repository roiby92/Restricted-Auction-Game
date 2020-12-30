import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index'
import socket from '../../socket'


const PlayersQueue = () => {

    const playersQueue = useSelector(state => state.game.playersQueue)
    useEffect(() => {
        socket.on("queue", (queue) => {
            dispatch(actions.queueChange(queue))
        })
    }, [playersQueue])

    console.log(playersQueue);

    return (
        <div>

        </div>
    )
}

export default PlayersQueue

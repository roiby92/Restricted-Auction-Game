import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index'
import socket from '../../socket'
const PlayersQueue = () => {

    const playersQueue = useSelector(state => state.playersQueue.playersQueue);
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on("playersQueue", (queue) => {
            dispatch(actions.setPlayersQueue(queue))
        });
    }, [playersQueue])

    return (
        <div>
            {playersQueue.length > 0 ? playersQueue.map(player => <p>{player.name}</p>) : <h3>No Players Whiting in QUEUE</h3>}
        </div>
    );
};

export default PlayersQueue;

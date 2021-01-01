import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index'
import socket from '../../socket';

const Timer = () => {
    const time = useSelector(state => state.game.time)
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('time', (time) => {
            dispatch(actions.setTime(time))
        })
    }, [time]);
    return (
        <div>
            {time ? <h3>{time}</h3> : <h4>loading</h4>}
        </div>
    )
}

export default Timer

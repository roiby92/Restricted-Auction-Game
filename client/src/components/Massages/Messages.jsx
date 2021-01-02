import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../socket';
import * as actions from '../../store/actions/index'

const Massages = () => {
    const gameMessages = useSelector(state => state.gameMessages.messeges)
    const dispatch = useDispatch();

    useEffect(() => {

        socket.on('playerEnterGameMsg', (msg) => {
            dispatch(actions.addMessage(msg))
        });

        socket.on('startGameMsg', (msg) => {
            dispatch(actions.addMessage(msg))
        });
        socket.on('playerLeaveMsg', (msg) => {
            dispatch(actions.addMessage(msg))
        });

        socket.on('playerBidMsg', (msg) => {
            dispatch(actions.addMessage(msg))
        });
        socket.on('winningBidMsg', (msg) => {
            dispatch(actions.addMessage(msg))
        });

        socket.on('winner', (msg) => {
            dispatch(actions.addMessage(msg))
        });

    },[]);
    return (
        <div id="messages-container">
            {gameMessages.map(m=>{<p key={m}>{m}</p>})}
        </div>
    )
}

export default Massages

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Dealer from '../../components/Dealer/Dealer'
import * as actions from '../../store/actions/index'
import socket from '../../socket'
import Timer from '../../components/Timer/Timer'

const GameBord = () => {
    const bid = 1000
    const player = useSelector(state => state.player)

    useEffect(() => {
        socket.on("player", (player) => {
            console.log(player);
        });
        socket.on("players", (players) => {
            console.log(players);
        });
    })
    const handleTime = () => {
        socket.emit('Round');
    }

    const handleOffer = () => {
        socket.emit('offer', { price: bid, player: player });
    }

    return (
        <div>
            <h1 onClick={handleTime}> CLICK</h1>
            <br />
            {/* <p>{item.name} {item.price}</p> */}
            <br />
            <h2 onClick={handleOffer}>offer</h2>
            <br />
            <br />
            <Timer />
        </div>
    )
}

export default GameBord



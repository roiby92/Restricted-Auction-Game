import React, { useEffect, useState } from 'react'
import io from "socket.io-client";
import Dealer from '../../components/Dealer/Dealer'
const ENDPOINT = "http://localhost:3001";
const socket = io(ENDPOINT);

const GameBord = () => {

    const [game, setGame] = useState('');
    const [dealer, setDealer] = useState();
    useEffect(() => {

        socket.on('game', (game) => {
            console.log(game);
            setGame(game)
            setDealer(game.dealer)
        })
        checkIsRun()

        socket.emit('initItems')

    }, [])
    const checkIsRun = async () => {
        if (!game.isRun) {
            socket.emit('addQueue', 'roi')
        }
    }
    return (
        <div>
            <Dealer dealer={dealer} />
        </div>
    )
}

export default GameBord

import React, { useEffect, useState } from 'react';
import Timer from '../../components/Timer/Timer';
import Players from '../../components/Players/Players'
import CurrentItem from '../../components/CurrentItem/CurrentItem'
import socket from '../../socket';
import * as actions from '../../store/actions/index'
import { useDispatch, useSelector } from 'react-redux';
import BidContriler from '../../components/Bids/BidsConrtoller';
import Messages from '../../components/Massages/Messages'
import './GameBord.css';

const GameBord = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('newPlayer', player => {
            dispatch(actions.addPlayerToList(player))
            localStorage.setItem('player',JSON.stringify(player))
        });
        socket.on('newBudget', budget => {
            dispatch(actions.setBudget(budget))
        })
        socket.on('game', game => {
            dispatch(actions.updateGame(game))
        });
        socket.on("playerLeave", playerId => {
            dispatch(actions.playerLeave(playerId));
        })
        return () => {
            socket.emit('disconnect')
        
        };
    }, []);


    return (
        <div id='container'>
            {/* {console.log(game)} */}
            <h1 > Game Runing</h1>
            <br />
            <Timer />
            <CurrentItem />
            <br />
            <Messages/>
            <br />
            <Players />
            <br />
            {<BidContriler />}
            <br />
            <br />
        </div>
    );
};
export default GameBord;



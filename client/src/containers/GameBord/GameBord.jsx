import React, { useEffect } from 'react';
import Timer from '../../components/Timer/Timer';
import Players from '../../components/Players/Players'
import PlayersQueue from '../../components/Players/PlayersQueue'
import CurrentItem from '../../components/CurrentItem/CurrentItem'
import BidsList from '../../components/Bids/BidsList';
import socket from '../../socket';
import * as actions from '../../store/actions/index'
import { useDispatch, useSelector } from 'react-redux';
const GameBord = () => {
    const game = useSelector(state => state.game)
    const dispatch = useDispatch();
    useEffect(() => {
        socket.on('start', game => {
            dispatch(actions.gameStart(game))
        })
        console.log(game);
    }, [game])

    return (
        <div>
            <h1 > Game Runing</h1>
            <br />
            <Timer />
            <CurrentItem />
            <BidsList />
            <br />
            <br />
            <Players />
            <br />
            <br />
            <PlayersQueue />
            <br />
        </div>
    );
};
export default GameBord;



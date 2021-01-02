import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index'
import socket from '../../socket'
import BidContriler from '../Bids/BidsConrtoller'

const Players = ({ player }) => {

    const players = useSelector(state => state.player.players)

    useEffect(() => {

    }, [])
    const playersList = players.filter(p => p.budget > 0);
    return (
        <div>
            {console.log(players)}
            {playersList.map(player => <p key={player.id}>{player.name}</p>)}
        </div>
    );
};
export default Players;

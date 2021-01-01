import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index'
import socket from '../../socket'
import BidContriler from '../Bids/BidContriler'

const Players = () => {
    const playersList = useSelector(state => state.player.playersList);
    const dispatch = useDispatch();
    useEffect(() => {
        socket.on("palyersList", (list) => {
            dispatch(actions.setPlayersList(list));
            console.log(playersList);
        });
    }, [playersList])

    return (
        <div>
            {playersList ? playersList.map(player => <p>{player.name}</p>) : <h3>No Players Connected</h3>}
            <BidContriler />
        </div>
    );
};
export default Players;

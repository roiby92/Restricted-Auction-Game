import React from 'react';
import { useSelector } from 'react-redux';

const Players = () => {
    const players = useSelector(state => state.game.players)
    return (
        <ol>
            players
            <br/>
            {console.log(players)}
            {players ? players.map(player => <li key={player.id}>{player.playerName}</li>) : <h3>No Players Available</h3>}
        </ol>
    );
};
export default Players;

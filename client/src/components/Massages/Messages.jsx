import React from 'react'
import { useSelector } from 'react-redux';

const Massages = () => {
    const gameMessages = useSelector(state => state.game.messages)
    return (
        <ul >
            Game Messages
            <br/>
            <br/>
                {!gameMessages ? <h3>loading messages</h3> : gameMessages.map(m => <li key={m}> {m}</li>)}
        </ul>
    )
}

export default Massages

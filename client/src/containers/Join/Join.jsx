import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import socket from '../../socket';
import './Join.css';

const Join = () => {
    const history = useHistory();
    const [userName, setUserName] = useState('')

    const handleChenge = event => {
        const value = event.target.value
        if (checkValidity(value)) {
            setUserName(value)
        }
        else {
            setUserName('')
            alert('insert valid caracters pleas')
        }
    };

    const handleSubmit = () => {
        console.log(userName);
        if (userName) {
            socket.emit("enter", userName);
            socket.on("player", (player) => {
                console.log(player);
            });
            history.push(`/bord`)
        }
        else {
            alert('must enter your data')
        }
    };

    const checkValidity = (key, value) => {
        let isValid = true;
        if (key === 'name') {
            const pattern = /^[a-zA-Z]/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    return (
        <div>
            <div id='enter'>
                <div id='form'>
                    <input
                        id='name'
                        name='name'
                        type='text'
                        placeholder='enter your full name'
                        value={userName}
                        onChange={handleChenge}
                    />
                    <button
                        id='submit'
                        type='submit'
                        onClick={handleSubmit}
                    >
                        Get Inside TO Bet!!
            </button>
                </div>
            </div>
        </div>
    )
}

export default Join;
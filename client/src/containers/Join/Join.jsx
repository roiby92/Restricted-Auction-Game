import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import './Join.css';

const Join = () => {
    const history = useHistory();

    const [userDetaile, setUserDetaile] = useState({
        userName: '',
        room: 1,
        budget: ''
    })

    const handleChenge = event => {
        const key = event.target.name
        const value = event.target.value
        if (checkValidity(key, value)) {
            setUserDetaile({ ...userDetaile, [key]: value })
        }
        else {
            setUserDetaile({ ...userDetaile, [key]: '' })
            alert('insert valid caracters pleas')
        }
    }

    const handleSubmit = () => {
        console.log(userDetaile);
        if (userDetaile.userName && userDetaile.budget) {
            history.push(`/bord`)
        }
        else {
            alert('must enter your data')
        }
    }

    const checkValidity = (key, value) => {
        let isValid = true;
        if (key === 'userName') {
            const pattern = /^[a-zA-Z]/;
            isValid = pattern.test(value) && isValid
        }
        if (key === 'budget' || key === 'room') {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    return (
        <div id='enter'>
            <div id='form'>
                <input
                    id='name'
                    name='userName'
                    type='text'
                    placeholder='enter your full name'
                    value={userDetaile.userName}
                    onChange={handleChenge}
                />
                <input
                    id='budget'
                    name='budget'
                    type='number'
                    placeholder='enter your budget'
                    value={userDetaile.budget}
                    onChange={handleChenge}
                />
                <input
                    id='room'
                    name='room'
                    type='number'
                    placeholder='enter your room'
                    value={userDetaile.room}
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
    )
}

export default Join;
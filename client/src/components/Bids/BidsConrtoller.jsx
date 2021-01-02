import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index'
import socket from '../../socket'
import './BidsConrtoller.css';
const BidsConrtoller = () => {

    const currentItem = useSelector(state => state.game.currentItem);
    const [bidValue, setBidValue] = useState(0);
    const handeBidChange = event => setBidValue(event.target.value);

    const handleOffer = () => {
        if (bidValue > currentItem.price / 2) {
            socket.emit('offer', bidValue);
            setBidValue(0);
        }
        else {
            alert('that is not a fair offer, offer more if you want that item');
        };
    };

    return (
        <div id='bid-controller'>
            <input type="number" value={bidValue} onChange={handeBidChange} />
            <button onClick={handleOffer}>offer</button>
        </div>
    );
};

export default BidsConrtoller

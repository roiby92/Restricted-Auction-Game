import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index'
import socket from '../../socket'

const BidContriler = () => {
    
    const currentItem = useSelector(state => state.game.currentItem);
    const dispatch = useDispatch();

    const [bid, setBid] = useState({
        item: currentItem,
        bidPrice: 0,
        playerId: ''
    });

    const handeBidChange = event => {
        const offer = event.target.value
        if (offer > bid.item.price / 2) {
            setBid({ ...bid, bidPrice: event.target.value });
        }
        else {
            alert('that is not a fair offer, offer more if you want that item');
        };
    };

    const handleOffer = () => {
        // dispatch(actions.playerBid(bid))
        socket.emit('offer', 'i just offerd');
        // setBid({ ...bid, bidPrice: 0 });
    };

    return (
        <div>
            <input type="number" value={bid.bidPrice} onChange={handeBidChange} />
            <button onClick={handleOffer}>offer</button>
        </div>
    );
};

export default BidContriler

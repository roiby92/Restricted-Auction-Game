import React from 'react'
import { useSelector } from 'react-redux';

const BidsList = () => {

    const bids = useSelector(state => state.game.bids);

    return (
        <div>
            {bids ? bids.map(bid => <p>{bid}</p>) : <h3>No Bids on that item</h3>}
        </div>
    )
}

export default BidsList

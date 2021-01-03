import React from 'react';
import { useSelector } from 'react-redux';

const CurrentItem = () => {
    const currentItem = useSelector(state => state.game.currentItem);

    if (currentItem) {
        return (
            <div id="item-conteimet">

                <h3>{currentItem.name}</h3>
                    Is Offer for a
                <h3>$ {currentItem.price}</h3>
            </div>
        );
    }
    else {
        return <h5>no item available</h5>;
    };
};
export default CurrentItem;

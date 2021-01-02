import React from 'react';
import { useSelector } from 'react-redux';

const CurrentItem = () => {
    const currentItem = useSelector(state => state.game.currentItem);

    if (currentItem) {
        return (
            <div id="item-conteimet">
                <p>{currentItem.name}</p>
                <p>{currentItem.price}</p>
            </div>
        );
    }
    else {
        return <h5>no item available</h5>;
    };
};
export default CurrentItem;

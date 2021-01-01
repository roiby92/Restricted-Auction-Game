import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index'
import socket from '../../socket';
const CurrentItem = () => {
    const currentItem = useSelector(state => state.game.currentItem);
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('updateGame', (game) => {
            console.log(game, 'game Updated');
            dispatch(actions.updateGame(game))
        });
    }, [currentItem]);

    if (currentItem) {
        return (
            <div>
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

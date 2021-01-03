import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Timer from '../../components/Dealer/Timer/Timer';
import Players from '../../components/Players/Players'
import CurrentItem from '../../components/CurrentItem/CurrentItem'
import socket from '../../socket';
import * as actions from '../../store/actions/index'
import { useDispatch, useSelector } from 'react-redux';
import BidContriler from '../../components/Bids/BidsConrtoller';
import Messages from '../../components/Massages/Messages'

const useStyles = makeStyles((theme) => ({
    game: {
        flexGrow: 1,
    },
    upperBar: {
        height: '100px'
    },
    line: {
        width: "100%",
        height: '5px',
        backgroundColor: 'white'
    },
    bottomBar: {
        top: 'auto',
        bottom: 0,
        height: '55px'
    },
    conto: {
        height: "450px"

    },

}));

const GameBord = () => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const players = useSelector(state => state.game.players)
    useEffect(() => {
        socket.on('game', game => {
            dispatch(actions.updateGame(game))
        });

        return () => {
            socket.emit('disconnect')

        };
    }, []);


    return (
        <div className={classes.game}>
            <AppBar position="static" className={classes.upperBar}>
                <Grid container direction='column' alignItems="center">
                    <Grid item xs={3}> WELLCON TO MY AUCTION GAME</Grid>
                </Grid>
                <div className={classes.line}></div>
                <Grid container direction='column'>
                    <Timer />
                </Grid>
            </AppBar>
            <div className={classes.conto}>
                <Grid container
                    direction="row"
                    justify="space-around"
                    alignItems="center">
                    <Grid item xs={4}>
                        <Players />
                    </Grid>
                    <Grid item xs={4}>
                        <CurrentItem />
                    </Grid>
                    <Grid item xs={4}>
                        <Messages />
                    </Grid>
                </Grid>
            </div>

            <AppBar position="static" className={classes.bottomBar}>
                <Grid container direction='column' alignItems="center" >
                    <BidContriler />
                </Grid>
            </AppBar>
        </div>
    );
};
export default GameBord;



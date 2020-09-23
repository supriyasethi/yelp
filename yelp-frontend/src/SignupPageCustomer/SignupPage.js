import React from 'react';
import {Grid} from '@material-ui/core';
import TopBar from '../TopBar/TopBar';
import SignupBody from './SignupBody.jsx';

export default function Signup(){
    return (    
        <Grid container direction="column">
            <Grid item >
                <TopBar />
            </Grid>
            <Grid item container>
                <Grid xs={0} sm={2}/>
                <Grid xs={12} sm={8}>
                <SignupBody />
                </Grid>
                <Grid xs={0} sm={2}/>
            </Grid>
        </Grid>
    );
}
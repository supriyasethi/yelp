import React from 'react';
import {Grid} from '@material-ui/core';
import TopBar from '../TopBar/TopBar';
import LoginBody from './LoginBody.jsx';

export default function LoginPage(){
    return (    
        <Grid container direction="column">
            <Grid item >
                <TopBar />
            </Grid>
            <Grid item container>
                <Grid xs={0} sm={2}/>
                <Grid xs={12} sm={8}>
                <LoginBody />
                </Grid>
                <Grid xs={0} sm={2}/>
            </Grid>
        </Grid>
    );
}
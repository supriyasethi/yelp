import React from 'react';
import {Grid} from '@material-ui/core';
import TopBar from '../TopBar/TopBar';
import ProfileHeader from './ProfileHeader.jsx';
import UserInfo from './UserInfo.jsx';
import UserDetails from './UserDetails.jsx';

export default function LoginPage(){
    return (    
        <Grid container direction="column">
            <Grid item >
                <ProfileHeader />
            </Grid>
            <Grid item container>
                <Grid xs={0} sm={2}/>
                <Grid xs={12} sm={8}>
                <UserInfo />
                </Grid>
                <Grid xs={0} sm={2}/>
            </Grid>
            <Grid item container>
                <Grid xs={0} sm={2}/>
                <Grid xs={12} sm={8}>
                <UserDetails />
                </Grid>
                <Grid xs={0} sm={2}/>
            </Grid>
        </Grid>
    );
}
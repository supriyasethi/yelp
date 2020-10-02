import React from 'react';
import {Grid} from '@material-ui/core';
import ProfileLinks from './ProfileLinks';
import ProfileInfo from './ProfileInfo';


const ProfileBody = () => {
    
    return (
        <Grid container
        direction="row"
        spacing={40}>
            <Grid xs={0} sm={1} justify="center"/>
            <Grid item xs={5} justify="center">
                <ProfileLinks />
            </Grid>
            <Grid item xs={5} 
             justify="center"
             alignContent="center">
               <ProfileInfo />
            </Grid>   
            <Grid xs={0} sm={1} justify="center"/>         
        </Grid>
    ) 
}

export default ProfileBody;
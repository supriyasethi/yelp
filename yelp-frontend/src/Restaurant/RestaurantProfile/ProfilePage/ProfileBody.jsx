import React from 'react';
import {Grid} from '@material-ui/core';
import RestaurantLinks from './RestaurantLinks';
import RestaurantInfo from './RestaurantInfo';


const ProfileBody = () => {
    
    return (
        <Grid container
        direction="row"
        spacing={40}>
            <Grid xs={0} sm={1} justify="center"/>
            <Grid item xs={2} justify="center">
                <RestaurantLinks />
            </Grid>
            <Grid item xs={8} 
             alignItems="flex-start" justify="flex-end">
               <RestaurantInfo />
            </Grid>   
            <Grid xs={0} sm={1}/>  
                   
        </Grid>
    ) 
}

export default ProfileBody;
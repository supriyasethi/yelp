import React from 'react';
import {Grid} from '@material-ui/core';
import ProfileHeader from './ProfileHeader.jsx';
import UserInfo from './UserInfo.jsx';
import UserDetails from './UserDetails.jsx';
import { connect } from 'react-redux';

 function Profile({props}){
     console.log(props);
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

const mapStateToProps = (state) => {
    return {
        users : state.profile.users
    }
    
}
export default connect(mapStateToProps)(Profile);


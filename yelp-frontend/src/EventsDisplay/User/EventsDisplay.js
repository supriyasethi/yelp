import React from 'react';
import {Grid} from '@material-ui/core';
import EventsList from './EventsList.jsx';
import LoginSignupTopBar from '../../helpers/LoginSignupTopBar';
import { useLocation } from "react-router-dom";
//import { connect } from 'react-redux';

 function EventsDisplay({props}){
     const location = useLocation();
    console.log(location.state.data)    
    return (    
        <Grid container direction="column" spacing={20}>
            <Grid item >
                <LoginSignupTopBar />
            </Grid>
            <Grid item container>
                <Grid xs={0} sm={3}/>
                <Grid xs={12} sm={6}>
                    <EventsList data={location.state.data}/>
                </Grid>
                <Grid xs={0} sm={3}/>
            </Grid>            
        </Grid>
    );
}

// const mapStateToProps = (state) => {
//     return {
//         users : state.profile.users
//     }
    
// }
//export default connect(mapStateToProps)(Profile);
export default EventsDisplay;


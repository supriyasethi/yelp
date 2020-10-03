import React, { useState } from 'react';
import {IconButton, Avatar} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {Typography} from '@material-ui/core';
import { connect, useDispatch } from "react-redux";
import axios from 'axios';

const useStyles = makeStyles( () => ({
    container : {
        position: 'relative',
        width: '100%;',
        display: 'flex',
        justifycontent: 'space-between',
        alignitems: 'center',
        margin: '2rem'
        //maxwidth: '400px',        
      },

      user : {
          margin: '3rem',
          justifyContent: 'center',
          alignItems: 'center',
      }
}));

 function UserInfo ({firstname, zipcode}) {

    let [username, setUsername] = useState();
    let [curruser, setcurruser] = useState();
    axios.get('http://localhost:3001/userprofile')
      .then((response) => {
         //update the state with the response data
       setcurruser(response.data) 
       console.log('curruser', curruser);
      });
    const classes = useStyles();
    
    return(           
        <div className={classes.container}>  
            <div style={{display: 'inline-block'}}>
            <Avatar 
             variant="square"
             src="https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_styleguide/7e4e0dfd903f/assets/img/default_avatars/user_large_square.png" 
              style={{
              margin: "10px",
              width: "250px",
              height: "250px",
            }} 
            />
            </div>
            <div className={classes.user}>
            <Typography style={{
                color:"#333333", 
                fontWeight: "bold", 
                fontSize : "29px"
                }}>{firstname}</Typography>
            <Typography style={{
                color:"#333333", 
                fontSize: "15px"
                }}>{zipcode}</Typography>

            </div>
      </div>  
       );       
}

const mapStateToProps = (state) => {
    return {
        firstname: state.profile.firstname,
        zipcode :  state.profile.zipcode
    }
  }

  export default connect(mapStateToProps, null)(UserInfo);
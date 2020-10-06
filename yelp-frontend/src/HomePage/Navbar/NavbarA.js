import React, { Component, useState, useEffect } from'react';
import styles from './Navbar.module.css'
import {Button, TextField, Typography} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import cookie from 'react-cookies';
import axios from 'axios';
//import { setLogout,fetchProfile } from "../../js/actions/index";
//import { connect, useDispatch } from "react-redux";


const NavbarA = ({user}) => {  

    let history = useHistory();      
    let curruser = '';
    let [data, setData] = useState();
    //const dispatch = useDispatch();
    function handleLogoutClick() {
      cookie.remove('cookie', { path: '/' })
       //dispatch(setLogout());       
       history.push("/");
    }
    
    function handleProfileClick() {

      //dispatch(fetchProfile(user))
      console.log('inside handleprofile click');
      // axios.get('http://localhost:3001/userp')
      //   .then((response) => {
      //  //update the state with the response data
      //   curruser = response.data.username
      //   setData({curruser});
      //   console.log(data);        
      // });               
       history.push("/userp");
    }   
       return(
           
        <div>
            <div className={styles["nav-bar"]}>
                <div className={styles["left"]}>
                    <span>Write a Review</span>
                    <span>Events</span>
                </div>
                <div className={styles["right"]}>
                <Button onClick={handleLogoutClick} color="primary" style={{
                            "color":"white", 
                            "font-size" : "12px",
                            "font-weight" : "bold"}}>Logout</Button>
                <Button onClick={handleProfileClick} color="primary" style={{
                            "color":"white", 
                            "font-size" : "12px",
                            "font-weight" : "bold"}}>Profile</Button>
                </div>
            </div>            
            </div>  
       );    
}

// const mapStateToProps = (state) => {
//   return {
//       user: state.login.user
//   }
// }
// function mapDispatchToProps(dispatch) {
//     console.log('inside map dispatch')
//     return {
//       setLogout: () => dispatch(setLogout())
//     };
//   }

//export default connect(mapStateToProps, mapDispatchToProps)(NavbarA);
export default NavbarA;

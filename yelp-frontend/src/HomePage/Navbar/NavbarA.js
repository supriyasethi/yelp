import React, { Component, useState } from'react';
import styles from './Navbar.module.css'
import {Button, TextField, Typography} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ChatBubbleTwoToneIcon from '@material-ui/icons/ChatBubbleTwoTone';
import { setLogout,fetchProfile } from "../../js/actions/index";
import { connect, useDispatch } from "react-redux";


const NavbarA = ({user}) => {  

    let history = useHistory();      

    const dispatch = useDispatch();
    function handleLogoutClick() {
       dispatch(setLogout());       
       history.push("/");
    }
    
    function handleProfileClick() {

      dispatch(fetchProfile(user))
      console.log('inside handelprofile click');
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
                <Button onClick={handleLogoutClick} color="primary" style={{"color":"#0073bb", "font-size" : "12px"}}>Logout</Button>
                <Button onClick={handleProfileClick} color="primary" style={{"color":"#0073bb", "font-size" : "12px"}}>Profile</Button>
                </div>
            </div>            
            </div>  
       );    
}

const mapStateToProps = (state) => {
  return {
      user: state.login.user
  }
}
function mapDispatchToProps(dispatch) {
    console.log('inside map dispatch')
    return {
      setLogout: () => dispatch(setLogout())
    };
  }
export default connect(mapStateToProps, mapDispatchToProps)(NavbarA);

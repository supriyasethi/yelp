import React, { Component, useState } from'react';
import styles from './Navbar.module.css'
import {Button, TextField, Typography} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ChatBubbleTwoToneIcon from '@material-ui/icons/ChatBubbleTwoTone';


const NavbarA = () => {  

    let history = useHistory();      


    function handleLogoutClick() {
        history.push("/");
    }
    
    function handleProfileClick() {
        console.log('inside handelprofile click');
        history.push("/user");
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

export default NavbarA;
import React, { Component, useState } from'react';
import styles from './Navbar.module.css'
import {Button, TextField, Typography} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import cookie from 'react-cookies';


const Navbar = () => {  

    let history = useHistory();      


    function handleLoginClick() {
        history.push("/login");
    }
    
    function handleSignupClick() {
        history.push("/signup");
    }    
    
       return(
           
        <div>
            <div>
            <div className={styles["nav-bar"]}>
                <div className={styles["left"]}>
                    <span>Write a Review</span>
                    <span>Events</span>
                </div>
                <div className={styles["right"]}>
                    <React.Fragment >
                        <Button onClick={handleLoginClick} color="primary" style={{
                            "color":"white", 
                            "font-size" : "12px",
                            "font-weight" : "bold"}}
                         >Log In</Button>
                        <Button onClick={handleSignupClick} className='button' variant='outlined' style={{
                            "color":"white", 
                            "font-size" : "12px",
                            "font-weight" : "bold"}}>Signup</Button>
                    </React.Fragment>
                </div>
            </div>    
            
            </div>
            </div>  
       );    
}

export default Navbar;
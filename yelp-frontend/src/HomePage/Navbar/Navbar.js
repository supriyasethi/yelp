import React, { Component } from'react';
import styles from './Navbar.module.css'

export function Navbar()  {    
        return(
            <div className={styles["nav-bar"]}>
                <div className={styles["left"]}>
                    <span>Write a Review</span>
                    <span>Events</span>
                </div>
                <div className={styles["right"]}>
                    <span>Login</span>
                    <button className='button'>Signup</button>
                </div>
            </div>            
        );   
}
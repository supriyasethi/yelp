import React, { Component } from'react';
import styles from './Navbar.module.css'
import {Button, TextField, Typography} from '@material-ui/core';
import {Redirect} from 'react-router';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';
import LoginPage from '../../LoginPageCustomer/LoginPage';
import {SignupPage} from '../../SignupPageCustomer/SignupPage';
import { useRoutes, A } from "hookrouter";
import { useHistory } from 'react-router-dom'



// const routes = {
//     "/login": () => <LoginPage />,
//     "/singup": () => <SignupPage />
// }

const Navbar = () => {  

    const history = useHistory()

    const handleButtonClick = (event) => {
        console.log(event.target.value)
        history.push("../../LoginPageCustomer/LoginPage")
    }
    console.log(LoginPage)
    //const routeResult = useRoutes(routes);       
       return(
           
        <div>
            <div className={styles["nav-bar"]}>
                <div className={styles["left"]}>
                    <span>Write a Review</span>
                    <span>Events</span>
                </div>
                <div className={styles["right"]}>
                    <Button value='/LoginPage' onClick={handleButtonClick} color="primary" style={{"color":"#0073bb", "font-size" : "12px"}}>Login</Button>
                    <button className='button'>Signup</button>
                </div>
            </div>            
            </div>  
       );    
    
}

export default Navbar;
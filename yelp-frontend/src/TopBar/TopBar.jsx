import { AppBar, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import logo from '../assets/styleIcon.PNG';
import {makeStyles} from '@material-ui/styles';
import { Redirect } from 'react-router';
import ReactDOM from 'react-dom';
import HomePage from '../HomePage/HomePage';
import { useRoutes, A } from "hookrouter";

const useStyles = makeStyles( () => ({
    iconStyle : {
        display: 'flex',
        justifyContent: 'center',
    }
}));   

const routes = {
    "/home": () => <HomePage />
}
const TopBar = () => {
    const classes = useStyles();
    const routeResult = useRoutes(routes);
    return (
    <AppBar position="static" style={{ background: '#d32323' }}>
        <Toolbar className={classes.iconStyle}>
           <A href="/home"><img src={logo}  alt='logo' /></A>          
        </Toolbar>
    </AppBar>
    );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<TopBar />, rootElement);
export default TopBar;


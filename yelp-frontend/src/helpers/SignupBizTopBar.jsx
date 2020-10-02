import { AppBar, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import logo from '../assets/styleIcon.PNG';
import {makeStyles} from '@material-ui/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles( () => ({
    iconStyle : {
        display: 'flex',
        //justifyContent: 'center',
    },
    baseText : {
        fontWeight: 'bold' 
    }

}));   


const SignupBizTopBar = () => {
    let history = useHistory(); 
    const classes = useStyles();
    function handleHomeClick() {
        history.push("/home");
    }
    
    return (
    <AppBar position="static" style={{ background: '#d32323' }}>
        <Toolbar className={classes.iconStyle}>
           <img onClick={handleHomeClick} src={logo}  alt='logo' />
           <Typography >
                  for business
          </Typography>       
        </Toolbar>
    </AppBar>
    );
}

export default SignupBizTopBar;


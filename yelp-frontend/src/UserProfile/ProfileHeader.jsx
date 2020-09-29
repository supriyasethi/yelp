import React from 'react';
import logo from '../assets/YelpLogo.jpg';
import {makeStyles} from '@material-ui/styles';
import { Searchbar } from '../Searchbar/Searchbar';
import {Button, TextField, Typography} from '@material-ui/core';
import styles from '../HomePage/Navbar/Navbar.module.css'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles( () => ({
    searcharea: {
        display: 'flex',
        flexdirection: 'column',
        alignitems: 'center',
        justifyContent: "center"
        
    },

    logo : {
        width: '100px',
        height: '40px',
        margin: '20px 0'
    },

    header: {
        display: "flex",
        justifycontent: "space-between",
        alignitems: "center",
        margin: "var(--element-spacing)"
        
    }
}));


export default function ProfileHeader () {
    const classes = useStyles();
    return(    
        <div>
            <img src="https://s3-media0.fl.yelpcdn.com/assets/2/www/img/b7e9d647188d/gfx/header_print.gif" className={classes.logo} alt='logo' />        
            <div className={classes.searcharea}>                      
                <Searchbar  />
            </div>  
        </div>
       );    
}
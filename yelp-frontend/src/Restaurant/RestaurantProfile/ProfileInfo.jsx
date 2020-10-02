import {recomposeColor, Typography } from "@material-ui/core";
import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import hoge from '../../assets/homepage.jpg'
//import { ImageBackground, StyleSheet, Text, View } from "react-native";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 250,
        fontSize: '12px',
        backgroundColor: theme.palette.background.paper,
        '& > *': {
            margin: theme.spacing(1),
          },
      },
      listItemText:{
        fontSize:'14px',
        fontWeight : 'bold',
      }
  }));

const ProfileLinks = () => {
    const classes = useStyles();  
    return (        
        <div className={classes.root} style={{paddingTop:"50px"}} >
           Hello
    </div>      
    );
}
export default ProfileLinks;
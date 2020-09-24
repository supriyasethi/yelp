import React from 'react';
import {IconButton, Avatar} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles( () => ({
    container : {
        position: 'relative',
        width: '100%;',
        maxwidth: '400px',
      },
      
    image : {
        display: 'block',
        width: '100%',
        height: 'auto'
      }
}));

export default function UserDetails () {

    const classes = useStyles();
    
    return(           
        <div >
            <input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
            />
            <label htmlFor="contained-button-file">
             <IconButton>
             <Avatar 
             src="/images/example.jpg" 
              style={{
              margin: "10px",
              width: "60px",
              height: "60px",
            }} 
            />
        </IconButton>
    </label>
      </div>  
       );    
}
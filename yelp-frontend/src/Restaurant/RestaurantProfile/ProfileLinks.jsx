import {recomposeColor, Typography } from "@material-ui/core";
import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import PhotoSizeSelectActualOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActualOutlined';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';

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
            <Typography style={{
                color:"#d32323", 
                fontWeight: "bold", 
                fontSize : "21px"
                }}>India's Kitchen</Typography>
            <Typography style={{
                color:"#333333",                 
                fontSize : "14px"
                }}>Address</Typography>
            <List component="nav" aria-label="main mailbox folders">
            <ListItem button>
                <ListItemIcon>
                <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText classes={{primary:classes.listItemText}} primary="Home" />
            </ListItem>            
            <ListItem button>
                <ListItemIcon>
                <BusinessOutlinedIcon />
                </ListItemIcon>
            <ListItemText classes={{primary:classes.listItemText}} primary="Business Information" />
            </ListItem>            
            <ListItem button>
                <ListItemIcon>
                <StarOutlinedIcon />
                </ListItemIcon>
            <ListItemText classes={{primary:classes.listItemText}} primary="Reviews" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                <PhotoSizeSelectActualOutlinedIcon />
                </ListItemIcon>
            <ListItemText classes={{primary:classes.listItemText}} primary="Photos" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                <MailOutlinedIcon />
                </ListItemIcon>
            <ListItemText classes={{primary:classes.listItemText}} primary="Inbox" />
            </ListItem>
            </List>                    
        </div>      
    );
}
export default ProfileLinks;
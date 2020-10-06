import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',    
    justifyContent: 'space-between',  
    width: '122%',
    padding: '5',       
  },      
  itemlist: {
    flexGrow: '0',
    flexShrink: '0',
    flexBasis: 'calc(25% - 10px)', /* separate properties for IE11 upport */
    margin: '5px',    
  },
  itemtext: {
    flexGrow: '3',
    flexShrink: '0',
    flexBasis: 'calc(25% - 10px)', /* separate properties for IE11 upport */
    margin: '5px',    
  },
  itemabout: {
    flexDirection: 'row',
    flexGrow: '0',
    flexShrink: '0',
    flexBasis: 'calc(25% - 10px)', /* separate properties for IE11 upport */
    margin: '5px',   
  }
}));

export default function InsetDividers() {
  const classes = useStyles();
  
  let [username, setUsername] = useState('');
  let [location, setlocation] = useState('');
  let [yelpingsince, setyelpingsince] = useState('');
  let [thingsilove, setthingsilove] = useState('');


  useEffect(() => {
    axios.get('http://localhost:3001/get/userp')
      .then((response) => {
         //update the state with the response data
        console.log(response);
        setUsername(response.data[0].first_name + ' ' + response.data[0].last_name);
        setlocation(response.data[0].city + ', ' + response.data[0].state);  
        setyelpingsince(response.data[0].yelping_since);
        setthingsilove(response.data[0].things_i_love);
          });
    },[]);
  
  return (
    <div className={classes.root}>
      <div className={classes.itemlist}>
      <List>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Profile Overview" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Friends" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BeachAccessIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Reviews"/>
      </ListItem>
    </List>
    </div>
    <div className={classes.itemtext}>
    <Typography style={{
        color:"#d32323", 
        fontWeight: "bold", 
        fontSize : "21px"
      }}>Recent Activity</Typography>
      <Divider />
    </div>       
    <div>
      <Divider orientation='vertical' />
    </div>
    <div className={classes.itemabout}>    
    <Typography style={{
        color:"#d32323", 
        fontWeight: "bold", 
        fontSize : "14px"
      }}>About {username} </Typography>  
      <Typography style={{
        color:'primary', 
        fontWeight: "bold", 
        fontSize : "14px"
      }}>Location </Typography>      
      {location}
      <Typography style={{
        color:'primary', 
        fontWeight: "bold", 
        fontSize : "14px"
      }}>Yelping Since </Typography> 
      {yelpingsince} 
      <Typography style={{
        color:'primary', 
        fontWeight: "bold", 
        fontSize : "14px"
      }}>Things I Love </Typography> 
      {thingsilove} 
    </div>
    </div>
  );
}
import React,{useState} from 'react';
import {Button, TextField, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

const SignupForm = () => {
    let redirect = '';
    
    let history = useHistory();
    
    const [state, setState] = React.useState({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        city    : ""
      });    
    const classes = useStyles();  
    
    function onSubmitLogin() {
        history.push("/login");
    }

    function nextPageRender() {
        history.push("/homea");
    }

    function handleChange(e) {
        console.log("handlechange state", state);
        const value = e.target.value;
     setState({
       ...state,
       [e.target.name]: value
         });
        
    }

    function handleSubmit() {
        
        console.log('inside handle submit')
        console.log('state', state);        
         axios.defaults.withCredentials = true;
         axios.post('http://localhost:3001/signup',state)
         .then(response => {
             console.log("Status code: ", response.status);
             if(response.status === 200) {
                history.push("/homea");
               //dispatch(failure());
         }
     })
     .catch(error => {   
        if(error.response.status === 422) {
          console.log(error);//          
          redirect = <p>Username already registered!</p>
          };
     });       
}       

    return (
        
        <div className={classes.root} style={{"padding-top":"150px"}}>          
            <form noValidate autoComplete="off" className={classes.root} >
                <TextField id="outlined-basic" label="First Name" variant="outlined" size="small" type="text"
                 style={{ height: "30px", width: "120px"}} name="firstname" value={state.firstname}
                 onChange={handleChange} />
                <TextField id="outlined-basic" label="Last Name" variant="outlined" size="small"  type="text"
                 style={{ height: "30px", width: "120px"}} name="lastname" value={state.lastname}
                 onChange={handleChange} />
                 <TextField id="outlined-basic" label="Email" variant="outlined" size="small" type="email"
                 style={{ height: "30px", width: "300px"}} name="username" value={state.username}
                 onChange={handleChange} />                 
                 <TextField id="outlined-basic" label="Password" variant="outlined" size="small" type="password"
                 style={{ height: "30px", width: "300px"}} name="password" value={state.password}
                 onChange={handleChange} />                 
                 <TextField id="outlined-basic" label="City" variant="outlined" size="small" type="text"
                 style={{ height: "30px", width: "300px"}} name="city" value={state.city}
                 onChange={handleChange} />              
            </form>
            <Typography style={{fontSize : "12px"}}>You also understand that Yelp may send marketing emails about Yelp’s products, services, and local events. You can unsubscribe at any time.</Typography>
            <Button variant="contained" color="secondary" style={{ 
                height: "37px", 
                width: "300px", 
                background: "#d32323"}} onClick={handleSubmit} >
                Sign Up
            </Button>
            {redirect}
            <Typography style={{
                color:"#e6e6e6", 
                fontSize : "10px"
                }}>Already on Yelp?
            <Button color="primary" style={{
                color:"#0073bb", fontSize : "10px"}}
                onClick={onSubmitLogin}>Log in</Button></Typography>
        </div>      
    );
}
export default SignupForm;
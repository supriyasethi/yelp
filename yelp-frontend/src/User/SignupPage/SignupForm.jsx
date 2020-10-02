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
    //const dispatch = useDispatch();
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
               
         }
     })
     .catch(error => {   
        if(error.response.status === 422) {
          console.log(error);
          redirect = <p>Username already registered!</p>
       
       };
     });
    }      

    return (
        
        <div className={classes.root} style={{"padding-top":"150px"}}>
            <Typography style={{
                color:"#d32323", 
                fontWeight: "bold", 
                fontSize : "21px"
                }}>Sign Up Yelp</Typography>
            <Typography style={{
                color:"#333333", 
                fontWeight: "bold", 
                fontSize : "14px"
                }}>Connect with great local businesses</Typography>
            <Typography style={{fontSize : "12px"}}>
                By logging in, you agree to Yelp’s Terms of Service and Privacy Policy.</Typography>
            <div className={classes.root}>
            <Button variant="contained" color="primary" style={{ 
                 height: "37px", 
                 width: "300px" , 
                 background: "#0073bb"}}>
                Continue with Facebook
            </Button>
            <Button variant="contained" color="default" style={{ 
                height: "37px", 
                width: "300px" , 
                background: "#cccccc"}}>
                Continue with Google
            </Button>
            <Button variant="contained" color="primary" style={{ 
                height: "37px", 
                width: "300px" , 
                background: "#333333"}}>
                Continue with Apple
            </Button>
            </div>
            <Typography style={{fontSize : "12px"}}>
                Don't worry, we never post without your permission.
                </Typography>
            <Typography>OR</Typography>
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
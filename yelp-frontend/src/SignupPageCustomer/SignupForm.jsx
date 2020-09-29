import React,{useState} from 'react';
import {Button, TextField, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { signupUser }  from "../js/actions/index";
import { connect, useDispatch } from "react-redux";
import store from "../js/store/index";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

const SignupForm = ({isRegistered, isAlreadyRegistered}) => {
    let redirect = '';
    const dispatch = useDispatch();
    let history = useHistory();
    
    const [firstname, setFirstName] = useState();
    const [lastname, setLastName] = useState();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [zipcode, setZipcode] = useState();

    const classes = useStyles();  
    
    function onSubmitLogin() {
        history.push("/login");
    }

    function nextPageRender() {
        history.push("/homea");
    }

    function handleSubmit() {
        
        console.log('inside handle submit')
        let signupFormInfo = {
            firstname : firstname,
            lastname : lastname,
            username : username,
            password : password,
            zipcode  : zipcode
         }
        
        dispatch(signupUser({ signupFormInfo }));
        //console.log('props',isRegistered);
        signupFormInfo = {};
        //history.push('/homea');
      }   

      if(isAlreadyRegistered == 'true') {
        redirect = <p>Username already registered!</p>
    } 
    if(isRegistered == 'true') 
    {
        history.push("/homea");
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
                <TextField id="outlined-basic" label="First Name" variant="outlined" size="small" 
                 style={{ height: "30px", width: "120px"}}
                 onChange={e => setFirstName(e.target.value)} />
                 <TextField id="outlined-basic" label="Last Name" variant="outlined" size="small" 
                 style={{ height: "30px", width: "120px"}}
                 onChange={e => setLastName(e.target.value)} />
                 <TextField id="outlined-basic" label="Email" variant="outlined" size="small" type="email"
                 style={{ height: "30px", width: "300px"}} 
                 onChange={e => setUserName(e.target.value)}/>
                 <TextField id="outlined-basic" label="Password" variant="outlined" size="small" type="password"
                 style={{ height: "30px", width: "300px"}} 
                 onChange={e => setPassword(e.target.value)}/>
                 <TextField id="outlined-basic" label="ZIP CODE" variant="outlined" size="small"
                 style={{ height: "30px", width: "300px"}} 
                 onChange={e => setZipcode(e.target.value)}/>
                   
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


const mapStateToProps = (state, ownProps) => {
    console.log('state',state);
    return { 
        isRegistered: state.signup.isRegistered,
        isAlreadyRegistered: state.signup.isAlreadyRegistered,    
    };
  };

function mapDispatchToProps(dispatch) {
    console.log('inside map dispatch')
    return {
      signupUser: signupFormInfo => dispatch(signupUser(signupFormInfo))
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
//export default SignupForm;
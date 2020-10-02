import React,{useState} from 'react';
import {Button, TextField, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { setLogin } from "../js/actions/index";



const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

const LoginForm = ({title, sender}) => {
    let history = useHistory(); 
   // let authFlag = false;
   // let authErr = '';

    let redirect = '';
    //const dispatch = useDispatch();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    // if(loginsuccess == 'true') {
    //     history.push("/homea");
    // } 
    // if (loginfailure == 'true')
    // {
    //     redirect = <p>Username & Password are invalid!</p>
    // }

    function onSubmitHandle() {
        let loginFormInfo = {
            'username' : username,
            'uassword' : password,
           // 'sender'   : sender
        }
       // dispatch(setLogin({ loginFormInfo }));
       // loginFormInfo = {};
    
        history.push('/homea');
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/login',loginFormInfo)
        .then(response => {
            console.log("Status code: ", response.status);
            if(response.status === 200) {
                history.push("/homea");
            }
        })
        .catch(error => { 
            console.log(error.response)
            if(error.response.status === 422) {
    //                authFlag = true;
      //          authErr = <p class="alert alert-danger" role="alert">{error.response.data}</p>
        //        return authErr;
                console.log(error.response.data);  
        };
    });        
    }    

    function onSubmitSignup() {        
        if (sender === 'user') {
        history.push("/signup"); }
        else if (sender == 'biz') {
            history.push("/signupbiz");
        }
    }

    const classes = useStyles();        
    
    return (
        <div className={classes.root} style={{paddingTop:"150px"}}>
            <Typography style={{
                color:"#d32323", 
                fontWeight: "bold", 
                fontSize : "21px"
                }}>{title}</Typography>
            <Typography style={{
                color:"#333333", 
                fontWeight: "bold", 
                fontSize : "14px"
                }}>New to Yelp?
            <Button color="primary" style={{
                color:"#0073bb", 
                fontWeight: "bold", 
                fontSize : "14px"
                }} onClick={onSubmitSignup}>SignUp</Button></Typography>
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
                background: "#cccccc" }}>
                Continue with Google
            </Button>
            <Button variant="contained" color="primary" style={{
                height: "37px", 
                width: "300px" , 
                background: "#333333"
                }}>
                Continue with Apple
            </Button>
            </div>
            <Typography>OR</Typography>
            <form noValidate autoComplete="off" className={classes.root}>
                 <TextField id="outlined-basic" label="Email" variant="outlined" size="small" 
                 style={{ height: "30px", width: "300px"}}
                 onChange={e => setUserName(e.target.value)} />
                 <TextField id="outlined-basic" label="Password" variant="outlined" size="small" type="password"
                 style={{ height: "30px", width: "300px"}}
                 onChange={e => setPassword(e.target.value)} />
            
            <Button color="primary" style={{
                color:"#0073bb", 
                fontSize : "11px"}}>Forgot Password?</Button>
            <Button onClick={onSubmitHandle} variant="contained" color="secondary" style={{ "min-height": "37px", width: "300px", background: '#d32323' }}>
                Log In
            </Button>
            <div>
            {redirect}
            </div>
            </form>
            <Typography style={{
                color:"#e6e6e6", 
                fontSize : "10px"}}>New to Yelp?
            <Button color="primary" style={{
                color:"#0073bb", fontSize : "10px"}}
                onClick={onSubmitSignup}>SignUp</Button></Typography>
        </div>
    );    
}

// function mapDispatchToProps(dispatch) {
//     console.log('inside map dispatch')
//     return {
//       setLogin: loginFormInfo => dispatch(setLogin(loginFormInfo))
//     };
//   }

//   const mapStateToProps = (state) => {
//       return {
//           user: state.login.user,
//           loginsuccess: state.login.loginsuccess,
//           loginfailure: state.login.loginfailure,
//       }
//  }
//export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
export default LoginForm;

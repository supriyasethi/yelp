import React from 'react';
import {Button, TextField, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

const LoginForm = () => {

    const classes = useStyles();

    return (
        <div className={classes.root} style={{"padding-top":"150px"}}>
            <Typography style={{"color":"#d32323", "font-weight": "bold", "font-size" : "21px"}}>Log In to Yelp</Typography>
            <Typography style={{"color":"#333333", "font-weight": "bold", "font-size" : "14px"}}>New to Yelp?
            <Button color="primary" style={{"color":"#0073bb", "font-weight": "bold", "font-size" : "14px"}}>SignUp</Button></Typography>
            <Typography style={{"font-size" : "12px"}}>By logging in, you agree to Yelp’s Terms of Service and Privacy Policy.</Typography>
            <div className={classes.root}>
            <Button variant="contained" color="primary" style={{ "min-height": "37px", width: "300px" , background: '#0073bb'}}>
                Continue with Facebook
            </Button>
            <Button variant="contained" color="default" style={{ "min-height": "37px", width: "300px" , background: '#cccccc'}}>
                Continue with Google
            </Button>
            <Button variant="contained" color="primary" style={{ "min-height": "37px", width: "300px" , background: '#333333'}}>
                Continue with Apple
            </Button>
            </div>
            <Typography>OR</Typography>
            <form noValidate autoComplete="off" className={classes.root}>
                 <TextField id="outlined-basic" label="Email" variant="outlined" size="small" 
                 style={{ "min-height": "30px", width: "300px"}} />
                 <TextField id="outlined-basic" label="Password" variant="outlined" size="small"
                 style={{ "min-height": "30px", width: "300px"}} />
            </form>
            <Button color="primary" style={{"color":"#0073bb", "font-size" : "11px"}}>Forgot Password?</Button>
            <Button variant="contained" color="secondary" style={{ "min-height": "37px", width: "300px", background: '#d32323' }}>
                Log In
            </Button>
            <Typography style={{"color":"#e6e6e6", "font-size" : "10px"}}>New to Yelp?
            <Button color="primary" style={{"color":"#0073bb", "font-size" : "10px"}}>SignUp</Button></Typography>
        </div>
        

    );
}

export default LoginForm;
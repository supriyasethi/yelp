import React from 'react';
import HomePage from './HomePage/HomePage.js'
import Profile from './UserProfile/Profile.js'
import HomePageA from './HomePage/HomePageA.js'
import {Switch, Route} from 'react-router-dom';
import LoginPage from './LoginPageCustomer/LoginPage';
import SignupPage from './SignupPageCustomer/SignupPage';

function App() {
   return (
     <Switch>
       <Route path="/login" component={LoginPage}/>
       <Route path="/signup" component={SignupPage}/>
       <Route path="/homea" component={HomePageA}/>
       <Route path="/user" component={Profile}/>
       <Route path="/" component={HomePage}/>
     </Switch>    
  );
}

export default App;

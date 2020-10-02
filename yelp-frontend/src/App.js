import React from 'react';
import HomePage from './HomePage/HomePage.js'
import UserProfile from './User/UserProfile/Profile.js'
import RestaurantProfile from './Restaurant/RestaurantProfile/Profile.js'
import HomePageA from './HomePage/HomePageA.js'
import {Switch, Route} from 'react-router-dom';
import LoginUser from './User/LoginPage/LoginUser';
import LoginRestaurant from './Restaurant/LoginPage/LoginRestaurant';
import Signup from './Restaurant/Signup/Signup';
import SignupPage from './User/SignupPage/SignupPage.js';

function App() {
   return (
     <Switch>
       <Route path="/login" component={LoginUser}/>
       <Route path="/loginbiz" component={LoginRestaurant}/>
       <Route path="/signup" component={SignupPage}/>
       <Route path="/signupbiz" component={Signup}/>
       <Route path="/homea" component={HomePageA}/>
       <Route path="/userp" component={UserProfile}/>
       <Route path="/bizp" component={RestaurantProfile}/>
       <Route path="/" component={HomePage}/>
     </Switch>    
  );
}

export default App;

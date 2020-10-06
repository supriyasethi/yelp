import React from 'react';
import HomePage from './HomePage/HomePage.js'
import UserProfile from './User/UserProfile/ProfilePage/Profile.js'
import UserProfileUpdate from './User/UserProfile/ProfileUpdate/ProfileUpdate';
import BizProfileUpdate from './Restaurant/RestaurantProfile/ProfileUpdate/ProfileUpdate.js';
import RestaurantProfile from './Restaurant/RestaurantProfile/ProfilePage/Profile.js'
import RestaurantMenu from './Restaurant/RestaurantProfile/Menu/Menu.js'
import Events from './Restaurant/RestaurantProfile/Events/Events.js'
import HomePageA from './HomePage/HomePageA.js'
import EventsDisplay from './Events/EventsDisplay.js'
import EventsRegister from './Events/EventsRegister.js'
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
       <Route path="/updateuprofile" component={UserProfileUpdate}/>
       <Route path="/updatebprofile" component={BizProfileUpdate}/>
       <Route path="/bizp" component={RestaurantProfile}/>
       <Route path="/menu" component={RestaurantMenu}/>
       <Route path="/events" component={Events}/>
       <Route path="/eventsdisplay" component={EventsDisplay}/>
       <Route path="/eventsregister" component={EventsRegister}/>
       <Route path="/" component={HomePage}/>
     </Switch>    
  );
}

export default App;

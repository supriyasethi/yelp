const { LOG_IN, LOGIN_ERROR, LOG_OUT } = require("../actionconstants/action-types")

const initialState = {
    user : [],
    loginSuccess : null,
    loginfailure : null
}

const loginReducer = (state = initialState, action) => {
  console.log("processing in reducer");
  console.log(action);
  switch (action.type) {
      case LOG_IN: {
        return  {
          user: action.payload.payload.loginFormInfo,
          loginsuccess: 'true',
          loginfailure: 'false'
        }           
  }
  case LOGIN_ERROR:  {
      return ({
           loginsuccess: 'false',
           loginfailure: 'true'
         });          
     }  
  case LOG_OUT:  {
     return ({
        loginsuccess: 'false'
         });          
     }       
  }   
  console.log(state);
    return state;    
}


export default loginReducer;
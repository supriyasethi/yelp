import React from 'react';
import styles from './Searchbar.module.css'
import axios from 'axios';
import {Button, TextField} from '@material-ui/core';

export function Searchbar() {

    let [state, setState] = React.useState({
        find: "",        
        where: ""        
      });  

    function handleFindChange(e) {
        const value = e.target.value;
           setState({
             ...state,
            [e.target.name]: value
            });
    }


    function handleSearch() {
        axios.get('http://localhost:3001/home',{
            params: {
                keyword: state.find,
                location: state.where
              }
        })
         .then(response => {
             console.log("Status code: ", response.status);
             if(response.status === 200) {
                //history.push("/homea");
               //dispatch(failure());
               console.log(response);
         }
        })
        .catch(error => {   
         console.log('error', error.response);
    })
}

    return(
        <div>
            <div className="field has-addons">
                <p className="control">
                  <a href className="button is-static is-medium">Find</a>
                </p>
                <p className="control">
                    <TextField className={`input is-medium ${styles['input']}`} id="outlined-basic" 
                    placeholder="Restaurants" variant="outlined"  size="medium" type="text" name="find" value={state.find}
                    onChange={handleFindChange} />                  
                </p>
                <p className="control">
                   <a href className="button is-static is-medium">Near</a>
                </p>
                <p className="control">
                    <TextField className={`input is-medium ${styles['input']}`} id="outlined-basic" 
                    placeholder="Where" variant="outlined"  size="medium" type="text" name="where" value={state.where}
                    onChange={handleFindChange} />                      
                </p>    
                <div >                                                      
                    <Button variant="contained" color="secondary" style={{ 
                        height: "50px", 
                        width: "20px", 
                        background: "#d32323", fontWeight:"bold"}} onClick={handleSearch} > Search </Button>                 
                </div>    
            </div>
        </div>
    )   
}
import React from 'react';
import styles from './Searchbar.module.css'

export function Searchbar() {
    return(
        <div>
            <div className="field has-addons">
                <p className="control">
                  <a href className="button is-static is-medium">Find</a>
                </p>
                <p className="control">
                   <input className={`input is-medium ${styles['input']}`} type="text" placeholder="Restuarants"/>
                </p>
                <p className="control">
                   <a href className="button is-static is-medium">Near</a>
                </p>
                <p className="control">
                    <input className={`input is-medium ${styles['input']}`} type="text" placeholder="Where"/>
                </p>    
                <div className={`button is-medium ${styles['search']}`}>
                    <span className="icon is-small">
                    <i className={`fas fa-search ${styles['icon']}`}></i>
                    </span>
                </div>    
            </div>
        </div>
    )
    

    
}
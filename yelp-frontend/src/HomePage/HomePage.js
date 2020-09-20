import React from 'react';
import { Navbar } from './Navbar/Navbar';
import { Searchbar } from './Searchbar/Searchbar';
import logo from '../assets/YelpLogo.jpg'
import styles from './HomePage.module.css'


export function HomePage(){
    return (    
        <div className={styles.homepage}>
        <div>
            <Navbar />
            <div className={styles['search-area']}>
            <img src={logo} className={styles.logo} alt='logo' />
            <Searchbar />
            </div>
        </div>
        </div>
    );
}
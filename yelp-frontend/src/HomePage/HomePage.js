import React from 'react';
import { Navbar } from './Navbar/Navbar';
import { Searchbar } from './Searchbar/Searchbar';
import logo from '../assets/YelpLogo.jpg'
import styles from './HomePage.module.css'


export function HomePage(){
    return (
        <div>
            <Navbar />
            <img src={logo} className={styles.logo} alt='logo' />
            <Searchbar />
        </div>
    );
}
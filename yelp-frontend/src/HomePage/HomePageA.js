import React from 'react';
import NavbarA from './Navbar/NavbarA';
import { Searchbar } from '../Searchbar/Searchbar';
import logo from '../assets/YelpLogo.jpg'
import styles from './HomePage.module.css';

export default function HomePage(){
    return (    
        <div className={styles.homepage}>
        <div>
            <NavbarA />
            <div className={styles['search-area']}>
            <img src={logo} className={styles.logo} alt='logo' />
            <Searchbar />
            </div>
        </div>            
        </div>
    );
}
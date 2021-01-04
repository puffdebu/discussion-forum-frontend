import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './Toolbar.module.css';

const Toolbar = () => {
    return (
        <header className={styles.Toolbar}>
            <nav>
                <NavigationItems/>
            </nav>
        </header>
    );
};


export default Toolbar;
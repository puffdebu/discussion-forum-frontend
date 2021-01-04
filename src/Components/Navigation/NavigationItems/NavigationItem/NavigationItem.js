import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavigationItem.module.css';

const NavigationItem = (props) => {
    return (
        <li className={styles.NavigationItemli}>
            <NavLink 
                className={styles.NavigationItem} 
                to={props.link} 
                exact={props.exact}
                activeClassName = {styles.LinkActive}
            > 
                {props.children} 
            </NavLink>
        </li>
    );
};

export default NavigationItem;
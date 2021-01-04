import React from 'react'
import styles from './Logout.module.css';

const Logout = (props) => {
    return (
       <li className={styles.li}>
           <button className={styles.button} onClick={props.onClicked}>Log Out</button>
       </li>
    );
};

export default Logout;

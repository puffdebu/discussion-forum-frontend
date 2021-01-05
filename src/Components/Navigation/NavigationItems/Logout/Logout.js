import React from 'react';
import Button from '../../../UI/Button/Button';
import styles from './Logout.module.css';

const Logout = (props) => {
    return (
       <li className={styles.li}>
           <Button className={styles.button} onClick={props.onClicked}>Log Out</Button>
       </li>
    );
};

export default Logout;

import React from 'react';
import styles from './Input.module.css';


const Input = (props) => {

    let classes = [styles.InputElement];
    if(props.touched && !props.isValid){
        classes.push(styles.invalid);
    }
    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            <input 
                type={props.type}
                className={classes.join(' ')} 
                value={props.value}
                onChange={(event) => props.changed(event,props.name)}
            />
        </div>
    );
};

export default Input;
import React from 'react';
import Aux from '../../Hoc/Auxiliary';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Posts from '../Posts/Posts';
import styles from './Discussion.module.css';

const Discussion = (props) => {
    let p = null;
    if(!props.isLoggedIn){
        p = <Redirect to='/' />
    }
    return(
        <Aux>
            <div className={styles.Discussion}>
                {p}
                <h1>Welcome back {props.userName}</h1>
                <button onClick={() => props.history.push('/add-post')}>Add a post!</button>
            </div>
            <Posts />
        </Aux>
    );
};


const mapStateToProps = state => {
    return {
        isLoggedIn : state.isLoggedIn,
        userId : state.userId,
        userName : state.userName,
    };
}

export default connect(mapStateToProps)(Discussion);
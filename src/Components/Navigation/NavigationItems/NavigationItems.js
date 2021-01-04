import React from 'react';
import { connect } from 'react-redux';
import NavigationItem from './NavigationItem/NavigationItem';
import Logout from './Logout/Logout';
import styles from './NavigationItems.module.css';
import * as actionCreators from '../../../store/actions/index';

const NavigationItems = (props) => {
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem link="/discussion" exact> Discussion </NavigationItem> 
            <NavigationItem link="/upcoming-events" exact> Upcoming Events </NavigationItem>
            <NavigationItem link="/about-us" exact> About Us </NavigationItem> 
            {props.isLoggedIn ? <Logout onClicked={props.logout}/> : null}
        </ul>
    )
};


const mapStateToProps = state => {
    return {
        isLoggedIn : state.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout : () => dispatch(actionCreators.logout()),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(NavigationItems);
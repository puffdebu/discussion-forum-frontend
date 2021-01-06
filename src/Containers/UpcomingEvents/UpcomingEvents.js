import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Aux from '../../Hoc/Auxiliary';


const UpcomingEvent = (props) => {
    let redirect = null;
    if(!props.isLoggedIn){
        redirect = <Redirect to='/' />
    }
    return (
        <Aux>
             {redirect}
             <h1>This is the upcoming event section.</h1>
        </Aux>
    );
};

const mapStateToProps = state => {
    return {
        isLoggedIn : state.isLoggedIn,
    };
}

export default connect(mapStateToProps)(UpcomingEvent);
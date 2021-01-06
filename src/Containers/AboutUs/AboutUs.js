import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Aux from '../../Hoc/Auxiliary';


const AboutUs = (props) => {
    let redirect = null;
    if(!props.isLoggedIn){
        redirect = <Redirect to='/' />
    }
    return(
        <Aux>
            {redirect}
            <h1>Hello this the About Us page.</h1>
        </Aux>
    );
};

const mapStateToProps = state => {
    return {
        isLoggedIn : state.isLoggedIn,
    };
}

export default connect(mapStateToProps)(AboutUs);
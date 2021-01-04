import React , { Component } from 'react';
import Layout from './Components/Layout/Layout';
import { connect } from 'react-redux';
import { Route , Switch} from 'react-router-dom';
import Authentication from './Containers/Authentication/Authentication';
import Discussion from './Containers/Discussion/Discussion';
import UpcomingEvent from './Containers/UpcomingEvents/UpcomingEvents';
import AboutUs from './Containers/AboutUs/AboutUs';
import AddPost from './Components/AddPost/AddPost';
import QuestionDiscussion from './Containers/QuestionDiscussion/QuestionDiscussion';
import * as actionCreators from './store/actions/index';
class App extends Component {

  componentDidMount() {
    this.props.defaultLogin();
  }
  render(){
    return (
      <Layout>
        <Switch>
          <Route path="/discussion" exact component={Discussion} />
          <Route path="/upcoming-events" exact component={UpcomingEvent} />
          <Route path="/question-discussion/:postId" exact component={QuestionDiscussion} />
          <Route path="/about-us" exact component={AboutUs} />
          <Route path="/add-post" exact component={AddPost} />
          <Route path="/" exact component={Authentication} />
        </Switch>
      </Layout>
    );
  };
};


const mapStateToProps = (state) => {
  return {
    isLoggedIn : state.isLoggedIn,
    token : state.token,
    userName : state.userName,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    defaultLogin : () => dispatch(actionCreators.defaultLogin()),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);
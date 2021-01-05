import React , {useState}from 'react';
import axios from 'axios';
import Aux from '../../Hoc/Auxiliary';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Posts from '../Posts/Posts';
import Button from '../../Components/UI/Button/Button';
import styles from './Discussion.module.css';


const Discussion = (props) => {
    const [loading,setLoading] = useState(false);
    const [newPost,setNewPost] = useState('');
    let p = null;
    if(!props.isLoggedIn){
        p = <Redirect to='/' />
    }
    const checkDisabled =(value) => {
        if(value.length > 0)
        return false;

        return true;
    }
    const onAddPost = () => {
        setLoading(true);
        axios.post('http://localhost:8080/create-post',{
            userId : props.userId,
            content : newPost,
        }).then(resp => {
            setLoading(false);
            setNewPost('');
        })
        .catch(err => {
            console.log(err);
        })
    }
    let postContent = <div className={styles.Spinner}> <CircularProgress /> </div>;
    if(!loading){
       postContent = ( 
       <Aux>
            <div className={styles.Discussion}>
                {p}
                <h1>Welcome back {props.userName}</h1>
                <textarea 
                    value={newPost} 
                    onChange={(event) => setNewPost(event.target.value)}
                    rows="5"
                >
                </textarea>
                <Button 
                    disabled={checkDisabled(newPost)}
                    onClick={onAddPost}
                >
                    Add Post
                </Button>
            </div>
            <Posts />
        </Aux>
       );
    }
    return postContent;
};


const mapStateToProps = state => {
    return {
        isLoggedIn : state.isLoggedIn,
        userId : state.userId,
        userName : state.userName,
    };
}

export default connect(mapStateToProps)(Discussion);
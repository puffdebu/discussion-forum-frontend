import React , { useState, useEffect }from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CircularProgress  from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Aux from '../../Hoc/Auxiliary';
import styles from './AddPost.module.css';

const useStyles = makeStyles({
    root : {
        width : '100px',
        backgroundColor: 'rgba(44, 61, 85, 1)',
        fontWeight : 'bold',
        borderRadius : '6px',
        '&:hover': {
            background: 'rgba(44, 61, 85, 1)',
         }
    },
});

const AddPost = (props) => {
    const classes = useStyles();
    const [post,setPost] = useState('');
    const [loading,setLoading] = useState(false);
    const onAddClicked = () => {
        setLoading(true);
        axios.post('http://localhost:8080/create-post',{
            userId : props.userId,
            content : post,
        }).then(resp => {
            setLoading(false);
            props.history.push('/discussion');
        })
        .catch(err => {
            console.log(err);
        })
    };
    const shouldRedirect = () => {
        let redirect = null;
        if(!props.isLoggedIn){
            redirect = <Redirect to='/' />
        }
        return redirect;
    }
    let addPostContent = (
        <div className={styles.Content}>
            <h1>{props.userName} ask a query!</h1>
            <textarea value={post} onChange={(event) => setPost(event.target.value)} rows="5"></textarea>
            <Button 
                onClick={onAddClicked}
                className={classes.root}
            >
                    Add
            </Button>
        </div>
    )
    if(loading){
        addPostContent = <div 
                    style={{    
                        display : 'flex',
                        alignItems: 'center',
                        justifyContent:'center',
                        marginTop : '30%'
                  }}>
                        <CircularProgress />
                </div>
    };
    return (
        <Aux>
            {shouldRedirect()}
            {addPostContent}
        </Aux>
    );
};

const mapStateToProps = state => {
    return {
        isLoggedIn : state.isLoggedIn,
        userId : state.userId,
        userName : state.userName,
    };
};

export default connect(mapStateToProps)(AddPost);
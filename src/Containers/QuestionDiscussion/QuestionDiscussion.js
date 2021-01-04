import React ,{ useState,useEffect } from 'react';
import  { connect } from 'react-redux';
import axios from 'axios';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Comment from '../../Components/Comment/Comment';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import Aux from '../../Hoc/Auxiliary';
import styles from './QuestionDiscussion.module.css';


const useStyles = makeStyles({
    root : {
        width : '160px',
        backgroundColor: 'rgba(44, 61, 85, 1)',
        fontWeight : 'bold',
        borderRadius : '6px',
        marginLeft : '35%',
        '&:hover': {
            background: 'rgba(44, 61, 85, 1)',
         }
    },
});

const QuestionDiscussion = (props) => {
    const classes = useStyles();
    const [post,setPost] = useState();
    const [loading,setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const postId = props.match.params.postId;
        axios.get(`http://localhost:8080/fetch-discussion-post/${postId}`).then(resp => {
            setPost(resp.data);
            setLoading(false);
        });
    },[]);
    let postContent = <div className={styles.Spinner}><CircularProgress /></div>;
    if(!loading && post){
        const name = post.name.charAt(0).toUpperCase() + post.name.slice(1);
        const content = post.content;
        const comments = post.comments;
        const currentUserName = props.userName.charAt(0).toUpperCase() +props.userName.slice(1);
        postContent = (
            <div className={styles.Post}>
                <div className={styles.SvgStyling}>
                    <AccountCircleIcon color="primary" fontSize="inherit" /> 
                    <div className={styles.Name}>
                        {name}
                    </div>
                </div>
                <div className={styles.postContent}>
                    {content}
                </div>
                <div className={styles.OuterWrapper}>
                    {comments.map(comment => {
                        return <Comment commentInfo={comment}/>;
                    })}
                    <div style={{margin : '10px'}}>
                        <div className={styles.Header}>
                            <AccountCircleIcon />
                            <div className={styles.HeaderName}>
                                {currentUserName}
                            </div>
                        </div>
                    </div>
                    <textarea rows="5" type="text"></textarea>
                    <Button
                     className={classes.root}
                    >
                        ADD COMMENT
                    </Button>
                </div>
            </div>
        );
    };
    return (
        <Aux>
            {postContent}
        </Aux>
    );
};

const mapStateToProps = state => {
    return {
        userId : state.userId,
        userName : state.userName,
    };
};

export default connect(mapStateToProps)(QuestionDiscussion);

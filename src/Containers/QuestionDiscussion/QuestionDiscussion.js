import React ,{ useState,useEffect } from 'react';
import  { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Comment from '../../Components/Comment/Comment';
import Button from '../../Components/UI/Button/Button';
import Aux from '../../Hoc/Auxiliary';
import styles from './QuestionDiscussion.module.css';

const QuestionDiscussion = (props) => {

    const [post,setPost] = useState();
    const [loading,setLoading] = useState(false);
    const [comment,setComment] = useState('');
    const [fetchNow,setFetchNow] = useState(false);
    useEffect(() => {
        setLoading(true);
        const postId = props.match.params.postId;
        axios.get(`http://localhost:8080/fetch-discussion-post/${postId}/${props.userId}`).then(resp => {
            console.log(resp);
            setPost(resp.data);
            setLoading(false);
        });
    },[fetchNow]);

    const onButtonClicked = () => {
        setLoading(true);
        axios.post('http://localhost:8080/add-comment',{
            userId : props.userId,
            content : comment,
            postId : props.match.params.postId,
        }).then(() => {
            setComment('');
            setLoading(false);
            setFetchNow(!fetchNow);
        });
    };

    const checkDisabled = (value) => {
        if(value.length > 0)
        return false;
        return true;
    };

    const upvotedClicked = (commentId) => {
        axios.post('http://localhost:8080/upvote/',{
           commentId : commentId,
           userId : props.userId,
        }).then((resp) => {
            setFetchNow(!fetchNow);
        })
    };
    const downvotedClicked = (commentId) => {
        axios.post('http://localhost:8080/downvote/',{
            commentId : commentId,
            userId : props.userId,
        }).then(resp => {
            setFetchNow(!fetchNow);
        });
    };
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
                        return <Comment 
                                 commentInfo={comment}
                                 key={comment.commentId}
                                 onUpvoteClick={() => upvotedClicked(comment.commentId)}
                                 onDownvoteClick={() => downvotedClicked(comment.commentId)}
                                />;
                    })}
                    <div style={{margin : '10px'}}>
                        <div className={styles.Header}>
                            <AccountCircleIcon />
                            <div className={styles.HeaderName}>
                                {currentUserName}
                            </div>
                        </div>
                    </div>
                    <textarea
                     value={comment}
                     onChange={(event) => setComment(event.target.value)}
                     rows="5" 
                     type="text"
                    >
                    </textarea>
                    <Button
                     onClick={onButtonClicked}
                     disabled={checkDisabled(comment)}
                    >
                        ADD COMMENT
                    </Button>
                </div>
            </div>
        );
    };
    let redirect = null;
    if(!props.isLoggedIn){
        redirect = <Redirect to='/' />
    }
    return (
        <Aux>
            {redirect}
            {postContent}
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

export default connect(mapStateToProps)(QuestionDiscussion);

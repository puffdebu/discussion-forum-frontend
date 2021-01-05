import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
//import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import styles from './Post.module.css';
import Button from '../UI/Button/Button';

const Post = (props) => {
    const { postInfo } = props;
    const name = postInfo.name.charAt(0).toUpperCase() + postInfo.name.slice(1);
    const content = postInfo.content;
    const { userId, postId } = postInfo ;

    const onViewDiscussionClicked = () => {
        props.history.push(`/question-discussion/${postId}`);
    }
    return (
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
            <div className={styles.ButtonWrapper}>
                <Button 
                    onClick={onViewDiscussionClicked}
                >
                    View Discussion
                </Button>
            </div>
        </div>  
    );
};


export default withRouter(Post);
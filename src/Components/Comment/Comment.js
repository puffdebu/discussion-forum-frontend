import React from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import styles from './Comment.module.css';
const Comment = ({commentInfo,onUpvoteClick,onDownvoteClick}) => {
    const {name , userId, commentId , content,upvotes,upvoted,downvoted} = commentInfo;
    let userName = name.charAt(0).toUpperCase() + name.slice(1);
    const upvoteClass = [styles.Upvote];
    const downvoteClass = [styles.Downvote];
    if(upvoted){
        upvoteClass.push(styles.Upvoted);
    }
    if(downvoted){
        downvoteClass.push(styles.Downvoted);
    }
    return (
        <div style={{margin : '10px'}}>
            <div className={styles.Header}>
                <AccountCircleIcon />
                <div className={styles.Name}>
                    {userName}
                </div>
                <div className={styles.UpvoteWrapper}>
                    <AiFillCaretUp
                     className={upvoteClass.join(' ')} 
                     onClick={onUpvoteClick} 
                     fontSize="large"
                    />
                    {upvotes}
                    <AiFillCaretDown 
                     className={downvoteClass.join(' ')}
                     onClick={onDownvoteClick} 
                     fontSize="large" 
                    />
                </div> 
            </div>
            <div style={{margin : '10px'}}>
                {content}
            </div>
        </div>
    )
};


export default Comment;
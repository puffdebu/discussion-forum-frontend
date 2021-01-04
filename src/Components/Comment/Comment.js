import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import styles from './Comment.module.css';
const Comment = ({commentInfo}) => {
    const {name , userId, commentId , content} = commentInfo;
    let userName = name.charAt(0).toUpperCase() + name.slice(1);
    return (
        <div style={{margin : '10px'}}>
            <div className={styles.Header}>
                <AccountCircleIcon />
                <div className={styles.Name}>
                    {userName}
                </div>
            </div>
            <div style={{margin : '10px'}}>
                {content}
            </div>
        </div>
    )
};


export default Comment;
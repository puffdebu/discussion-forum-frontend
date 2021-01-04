import React , {useState,useEffect} from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress'
import Post from '../../Components/Post/Post';
import Aux from '../../Hoc/Auxiliary';
import styles from './Posts.module.css';

const Posts = () => {
    const [posts,setPosts] = useState();
    const [loading,setLoading] = useState(false);
   useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:8080/fetch-posts')
            .then(resp => {
                console.log(resp.data);
                setPosts(resp.data);
                setLoading(false);
            });
    }, []);

    let postContent = <div className={styles.Spinner}> <CircularProgress /> </div>;
    if(posts && !loading){
       postContent = (
           <div>
               {posts.map(post => (
                <Post postInfo={post} key={post.postId} />
                ))}
           </div>
       );   
    };
    return (
        <Aux>
            <div className={styles.divHeader}>
                <h1>Tech Discussions!</h1>
            </div>
            {postContent}
        </Aux>
    );
};

export default Posts;
import '../../css/post.css';
import { useNavigate, useParams } from 'react-router-dom';
import CommentList from './commentList';
import PostContent from './postContent';
import CommentAction from './commentAction';
import { useEffect, useState } from 'react';
import axios from '../../config/axios';
import Spinner from '../../utils/spinner';


function Post() {
    const { postId } = useParams();
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(false)

    const fetchPost = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`/posts/one-post/${postId}`)
            setPost(res.data)
        } catch (err) {
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPost()
    }, []);

    const navigate = useNavigate()

    return (
        <div className="postPage">
            {loading && <Spinner />}
            <div className="back-to-page" style={{ width: '255px' }} onClick={() => navigate(-1)}>Back to Community</div>
            <div className="post-wrapper">
                {post.length !==0 && !loading && <PostContent post={post} />}
                <CommentList comment={post.Comments}/>
                <CommentAction fetchPost={fetchPost}/>
            </div>
        </div>
    )
}

export default Post;
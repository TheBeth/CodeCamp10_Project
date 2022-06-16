import { useContext } from 'react';
import { Link } from 'react-router-dom'
import timeSince from '../../service/timeSince';
import DeletePost from './deletePost';
import {AuthContext} from '../../context/AuthContext';
import axios from '../../config/axios';

function CommunitySingerItem({ post: { User: { firstName, lastName }, Comments, createdAt, id, header } }) {
    const {user} = useContext(AuthContext);

    const deletePost = async () => {
        try{
            await axios.delete(`/posts/${id}`)
        }catch(err){
            console.log(err.response.deta.message)
        }
    }

    let adminBtn
    if(user.firstName === 'Admin'){
        adminBtn =  <DeletePost deletePost={deletePost}/>
    }
    return (
        <>
            <Link to={`/post/${id}`} className='one-post'>
                <div className='one-post-left'>{header}</div>
                <div className='one-post-center'>
                    <p>post by : {firstName} {lastName}</p>
                    <p>{Comments.length} comments</p>
                </div>
                <div className='one-post-right'>post date : {timeSince(createdAt)}</div>
            </Link>
            {adminBtn}
        </>
    )
}

export default CommunitySingerItem;
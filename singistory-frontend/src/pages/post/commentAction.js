import { useState } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import userIcon from '../../asset/icon/user.png';
import { AuthContext } from '../../context/AuthContext';
import {ErrorContext} from '../../context/ErrorContext';
import axios from '../../config/axios';

function CommentAction({ fetchPost }) {
    const [title, setTitle] = useState('');
    const {postId} = useParams();

    const {setError} = useContext(ErrorContext)
    const { user } = useContext(AuthContext);

    const createComment = async () => {
        try{
            await axios.post('/comments', {title, postId:postId})
            fetchPost()
            setTitle('')
        }catch(err){
            setError(err.response.data.message)
        }
    }

    const handleSubmitForm = async e => {
        e.preventDefault();
        createComment(title)
    }
    

    return (
        <div className='comment-action-path'>
            <img src={user.profileImg ?? userIcon} alt='user' />
            <div className='comment-action-main'>
                <form className='form-comment' onSubmit={handleSubmitForm}>
                    <input
                        type='text'
                        placeholder='comment here...'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <button type='submit'>Comment</button>
                </form>
            </div>
        </div>
    )
}

export default CommentAction;
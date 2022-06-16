import userIcon from '../../asset/icon/user.png';
import timeSince from '../../service/timeSince';
import DeleteComment from './deleteComment';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import axios from '../../config/axios';

function CommentItem({ comment: { User, title, createdAt, id } }) {
    const { user } = useContext(AuthContext);

    const deleteComment = async () => {
        try {
            await axios.delete(`/comments/${id}`)
        } catch (err) {
            console.log(err)
        }
    }
    console.log(id)

    let adminBtn
    if (user.firstName === 'Admin') {
        adminBtn = <DeleteComment deleteComment={deleteComment} />
    }

    return (
        <div className='comment-path'>
            <img src={User.profileImg ?? userIcon} alt='user' />
            <div className='comment-main'>
                <div className='comment-detail'>{title}</div>
                {adminBtn}
                <div className='comment-footer'>
                    <p>comment by : {User.firstName}</p>
                    <p>comment date : {timeSince(createdAt)}</p>
                </div>
            </div>
        </div>
    )
}

export default CommentItem;
import userIcon from '../../asset/icon/user.png'
import timeSince from '../../service/timeSince'

function PostContent({ post: { User, header, title, img, createdAt } }) {

    return (
        <div className='post-path'>
            <img src={User.profileImg ?? userIcon} alt='user' />
            <div className='post-main'>
                <div className='post-header'>{header}</div>
                <div className='post-detail'>{title}</div>
                {img && <img src={img} alt='equal' />}
                <div className='post-footer'>
                    <p>post by : {User.firstName}</p>
                    <p>post date : {timeSince(createdAt)}</p>
                </div>
            </div>
        </div>
    )
}

export default PostContent
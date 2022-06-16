import { Link } from 'react-router-dom'
import CommunityUpdated from './communityUpdated';

function CommunityMainItem({community : {id,firstName, lastName, Posts}}) {

    let post = Posts.map(item => item)
    let time = {}
    time = post[0]
    let update = Object.assign({},time)
    

    return (
        <Link to={`/community/${id}`} className='community-one-singer'>
            <div className='community-one-singer-left'>{firstName} {lastName}</div>
            <div className='community-one-singer-center' >Post :  {Posts.length} posts</div>
            <CommunityUpdated time={update}/>
        </Link>
    )
}

export default CommunityMainItem;
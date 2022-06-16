import { Link } from "react-router-dom";

function FollowItem({singer}){
    return(
        <Link to={`/singer/${singer.id}`} className='interest-singer-list'>
            <p style={{color:'white'}}>{singer.firstName} {singer.lastName}</p>
        </Link>
    )
}

export default FollowItem;
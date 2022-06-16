import defaultImg from '../../asset/images/default-image.jpeg'
import { Link } from 'react-router-dom'

function SingerItem({singer:{id,firstName, lastName, singerImg}}) {
    return (
        
            <Link to={`/singer/${id}`} className='singer-card'>
                <img src={singerImg ?? defaultImg} alt={firstName} />
                <div className='singer-name'>
                    <p>{firstName}</p>
                    <p>{lastName}</p>
                </div>
            </Link>
       
    )
}

export default SingerItem;
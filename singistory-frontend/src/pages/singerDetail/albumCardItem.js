import defaultImg from '../../asset/images/default-image.jpeg'
import { Link } from 'react-router-dom'

function AlbumCardItem({ album :{id,albumName, year, coverImg}}) {


    return (
        <Link to={`/album/${id}`} className='album-card-detail' style={{ textDecoration: 'none' }}>
            <img src={coverImg ?? defaultImg} alt='equal' style={{ width: '250px', height: '180px', objectFit: 'cover' }} />
            <div className='album-card-detail-name'>
                <p>{albumName}</p>
                <p>{year}</p>
            </div>
        </Link>
    )
}

export default AlbumCardItem;
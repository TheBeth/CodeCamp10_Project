import equal from '../../asset/images/default-image.jpeg'

function AlbumCardDetail({album:{coverImg, year, track, albumName, Singer}}) {

    return (
        <div className='album-detail-card'>
            <img src={coverImg ?? equal} alt='equal' style={{ width: '340px', height: 'auto', objectFit: 'cover' }} />
            <div className='album-info'>
                <div className='album-info-header'>{albumName}</div>
                <p>{Singer.firstName} {Singer.lastName}</p>
                <p>Year  release : {year}</p>
                <p>Track : {track} Songs</p>
            </div>
        </div>
    )
}

export default AlbumCardDetail;
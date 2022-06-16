import sp from '../../asset/icon/spotify.png'
import yt from '../../asset/icon/youtube.png'
import SongGenre from './songGenre';

function AlbumListItem({ song:{spotify,songName,youtube, Singer,Genres} }) {

    return (
        <tr style={{ padding: '0px' }}>
            <td className='all-detail-song'>
                <p className='songName'>{songName}</p>
                <p className='singer-song'>{Singer.firstName} {Singer.lastName}</p>
            </td>
            <td className='songTime'>
                {Genres.map(item => (
                    <SongGenre key={item.id} genre={item} />
                ))}
            </td>
            <td className='streaming'>
                <a href={spotify} target='_blank' rel='noreferrer'>
                    <img src={sp} alt="spotify" />
                </a>
                <a href={youtube} target='_blank' rel='noreferrer'>
                    <img src={yt} alt="youtube" />
                </a>
            </td>
        </tr>

    )
}

export default AlbumListItem;
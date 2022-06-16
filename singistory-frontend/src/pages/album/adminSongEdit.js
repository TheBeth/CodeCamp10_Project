import { Link, useNavigate } from 'react-router-dom';
import DeleteAlbum from './deleteAlbum';
import axios from '../../config/axios';

function AdminSongEdit({ albumId }) {


    const deleteAlbum = async () => {
        try {
            await axios.delete(`/album/${albumId}`)
        } catch (err) {
            console.log(err.ressponse.data.message)
        }
    }

    const navigate = useNavigate();

    return (
        <div className='album-detail-footer'>
            <Link to={`/editalbum/${albumId}`}>
                <button>Add Song</button>
            </Link>
            <Link to={`/editingalbum/${albumId}`}>
                <button>Edit Album</button>
            </Link>
            <DeleteAlbum deleteAlbum={deleteAlbum} />
        </div>
    )
}

export default AdminSongEdit;
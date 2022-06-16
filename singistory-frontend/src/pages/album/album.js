import '../../css/album.css'
import { useNavigate, useParams } from 'react-router-dom'
import SongList from './songList'
import AdminSongEdit from './adminSongEdit';
import { useEffect, useState } from 'react';
import axios from '../../config/axios';
import AlbumCardDetail from './albumCard';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


function Album() {
    const [album, setAlbum] = useState([]);
    const {albumId} = useParams();

    const {user} = useContext(AuthContext);

    const fetchAlbum = async () => {
        try{
            const res = await axios.get(`/album/${albumId}`)
            setAlbum(res.data)
        }catch(err){
            console.log(err)
        }
    }
    
    useEffect(() => {
        fetchAlbum()
    },[])

    const navigate = useNavigate()

    let adminBtn
    if(user.firstName === 'Admin'){
        adminBtn = <AdminSongEdit albumId={albumId}/>
    }

    return (
        <div className="albumPage">
            <div className='back-to-page' onClick={() => navigate(-1)} >Back to Singer</div>
            <div className='album-wrapper'>
                {album.length !==0 && <AlbumCardDetail album={album}/>}
                <SongList album={album}/>
                {adminBtn}
            </div>
        </div>
    )
}
export default Album;
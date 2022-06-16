import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import '../../css/editAlbum.css'
import AddSongForm from './addSongForm';
import AddSongList from './addSongList';
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../config/axios';
import { useState } from 'react';
import { useEffect } from 'react';

function EditAlbum() {
    const { albumId } = useParams();
    const [song, setSong] = useState([]);

    const fetchSong = async () => {
        try {
            const res = await axios.get(`/album/${albumId}`) 
            setSong(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchSong()
    },[]);


    const navigate = useNavigate();

    return (
        <div className="editAlbumPage">
            <div className='back-to-page' style={{ width: '255px' }} onClick={() => navigate(-1)}>Back to Album</div>
            <div className="edit-album-wrapper"
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500, }}>
                <div className='edit-album-main'>
                    <div className='edit-album-song-list'>
                        <div className='edit-album-header'>
                            <div className='edit-album-header-text'>Song List</div>
                            <AddSongForm song={song} fetchSong={fetchSong}/>
                            <AddSongList song={song.Songs}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditAlbum;
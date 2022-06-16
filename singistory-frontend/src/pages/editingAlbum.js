import { useNavigate, useParams } from 'react-router-dom';
import '../css/newAlbum.css';
import axios from '../config/axios';
import { useState } from 'react';
import { useContext } from 'react';
import { ErrorContext } from '../context/ErrorContext'
import { useEffect } from 'react';
import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material"

function EditingAlbum() {
    const { albumId } = useParams();
    const navigate = useNavigate();
    const [albumName, setAlbumName] = useState('');
    const [track, setTrack] = useState('');
    const [year, setYear] = useState('');
    const [album, setAlbum] = useState([]);
    const [showMessage, setShowMessage] = useState(true);

    const { setError } = useContext(ErrorContext);

    const fetchAlbum = async () => {
        try {
            const res = await axios.get(`/album/${albumId}`)
            setAlbum(res.data)
        } catch (err) {
            setError(err.response.data.message)
        }
    }

    useEffect(() => {
        fetchAlbum()
    }, []);

    const editAlbum = async () => {
        try {
            const res = await axios.patch(`/album/edit-album/${albumId}`, { albumName, track, year })
            if(res){
                setShowMessage(true)
                fetchAlbum()
                setAlbumName('')
                setYear('')
                setTrack('')
            }
        } catch (err) {
            setError(err.response.data.message)
        }
    }

    const handleSubmitForm = e => {
        e.preventDefault()
        editAlbum()
    }

    const handleCloseSnake = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowMessage(false);
    };

    return (
        <>
            <div className="newAlbumPage">
                <div className='back-to-page' style={{ width: '255px' }} onClick={() => navigate(-1)}>Back to Album</div>
                <div className="new-album-wrapper">
                    <div className='new-album-main'>
                        <div className='new-album-header'>
                            <div className='new-album-header-text'>Edit Album</div>
                            <form className='new-album-form' onSubmit={handleSubmitForm} >

                                <div className='row'>
                                    <div className='col-25'>
                                        <label>Album Name</label>
                                    </div>
                                    <div className='col-75'>
                                        <input
                                            type='text'
                                            placeholder={album.albumName}
                                            value={albumName}
                                            onChange={e => setAlbumName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-25'>
                                        <label>Track</label>
                                    </div>
                                    <div className='col-75'>
                                        <input
                                            type='text'
                                            placeholder={album.track}
                                            value={track}
                                            onChange={e => setTrack(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-25'>
                                        <label>Year Release</label>
                                    </div>
                                    <div className='col-75'>
                                        <input
                                            type='text'
                                            placeholder={album.year}
                                            value={year}
                                            onChange={e => setYear(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <button type='submit'>Edit Album</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={3000}
                onClose={handleCloseSnake}
                open={showMessage}
            >
                <Alert onClose={handleCloseSnake} severity="success">
                    Album Edited
                </Alert>
            </Snackbar>
        </>
    )
}

export default EditingAlbum;
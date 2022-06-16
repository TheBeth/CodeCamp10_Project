import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorContext } from '../context/ErrorContext';
import '../css/newAlbum.css';
import axios from '../config/axios';
import Spinner from '../utils/spinner';
import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material"

function NewAlbum() {

    const navigate = useNavigate()

    const { setError } = useContext(ErrorContext);

    const { singerId } = useParams();
    const [albumName, setAlbumName] = useState('');
    const [year, setYear] = useState('');
    const [track, setTrack] = useState('');
    const [coverImg, setCoverImg] = useState('');
    const [loading, setLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const createAlbum = async () => {
        const formData = new FormData()
        formData.append('albumName', albumName)
        formData.append('year', year)
        formData.append('track', track)
        formData.append('coverImg', coverImg)
        formData.append('singerId', singerId)

        try {
            setLoading(true)
            const res = await axios.post('/album', formData)
            if (res) {
                setShowMessage(true)
            }
        } catch (err) {
            setError(err.response.data.message)
        } finally {
            setLoading(false)
            setAlbumName('')
            setYear('')
            setTrack('')
            setCoverImg('')
        }
    }

    const handleSubmitForm = e => {
        e.preventDefault()
        createAlbum()
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
                {loading && <Spinner />}
                <div className='back-to-page' style={{ width: '255px' }} onClick={() => navigate(-1)}>Back to Profile</div>
                <div className="new-album-wrapper">
                    <div className='new-album-main'>
                        <div className='new-album-header'>
                            <div className='new-album-header-text'>New Album</div>
                            <form className='new-album-form' onSubmit={handleSubmitForm}>

                                <div className='row'>
                                    <div className='col-25'>
                                        <label>Album Name</label>
                                    </div>
                                    <div className='col-75'>
                                        <input
                                            type='text'
                                            placeholder='Album Name'
                                            value={albumName}
                                            onChange={e => setAlbumName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-25'>
                                        <label >Year Release</label>
                                    </div>
                                    <div className='col-75'>
                                        <input
                                            type='text'
                                            placeholder='Year'
                                            value={year}
                                            onChange={e => setYear(e.target.value)}
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
                                            placeholder='Track'
                                            value={track}
                                            onChange={e => setTrack(e.target.value)}
                                        />
                                    </div>
                                </div>
                                {coverImg && (
                                    <img
                                        src={URL.createObjectURL(coverImg)}
                                        className="img-fluid"
                                        style={{ width: '250px', height: '180px', objectFit: 'cover', marginLeft: '250px' }}
                                        alt="post-img"
                                    />
                                )}
                                <div className='row'>
                                    <div className='col-25'>
                                        <label>Album Image</label>
                                    </div>
                                    <div className='col-75s'>
                                        <input
                                            type='file'
                                            onChange={e => { if (e.target.files[0]) setCoverImg(e.target.files[0]) }}
                                        />
                                        <button type='reset' onClick={() => setCoverImg('')}>Remove</button>
                                    </div>
                                </div>
                                <button
                                    type='submit'
                                >
                                    New Album
                                </button>
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
                    Album Created
                </Alert>
            </Snackbar>
        </>
    )
}

export default NewAlbum;
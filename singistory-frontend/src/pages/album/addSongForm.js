import * as React from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useState } from 'react';
import { useContext } from 'react';
import { ErrorContext } from '../../context/ErrorContext';
import axios from '../../config/axios';
import Spinner from '../../utils/spinner';
import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material"
import { FinishContext } from '../../context/FinishContext';

function AddSongForm({ song }, { fetchSong }) {
    const [open, setOpen] = useState(false);
    const [songName, setSongName] = useState('');
    const [spotify, setSpotify] = useState('');
    const [youtube, setYoutube] = useState('');
    const [loading, setLoading] = useState(false)
    const { setError } = useContext(ErrorContext);
    const { singerId, id } = song;
    const [showMessage, setShowMessage] = useState(false);

    const { setFinish } = useContext(FinishContext)


    console.log(song)

    const createSong = async () => {
        try {
            setLoading(true)
            const res = await axios.post('/song', { songName, spotify, youtube, singerId: singerId, albumId: id })
            if(res) {
                setShowMessage(true)
            }
            fetchSong()
        } catch (err) {
            setError(err.response.data.message)
        } finally {
            setLoading(false)
            setSongName('')
            setSpotify('')
            setYoutube('')
        }
    }

    const handleSubmitForm = async e => {
        e.preventDefault();
        createSong()
        setOpen(false)
        fetchSong()
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCloseSnake = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowMessage(false);
    };

    return (
        <>
            {loading && <Spinner />}
            <button type='button' onClick={handleOpen}>Add Song</button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition

            >
                <Fade in={open}>
                    <form className='edit-album-form' onSubmit={handleSubmitForm}>
                        <div className='row'>
                            <div className='edit-album-header-text'>Edit Song</div>
                            <div className='col-25'>
                                <label>Title</label>
                            </div>
                            <div className='col-75'>
                                <input
                                    type='text'
                                    placeholder='Title'
                                    value={songName}
                                    onChange={e => setSongName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-25'>
                                <label>Spotify</label>
                            </div>
                            <div className='col-75'>
                                <input
                                    type='text'
                                    placeholder='Spotify'
                                    value={spotify}
                                    onChange={e => setSpotify(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-25'>
                                <label >Youtube</label>
                            </div>
                            <div className='col-75'>
                                <input
                                    type='text'
                                    placeholder='Youtube'
                                    value={youtube}
                                    onChange={e => setYoutube(e.target.value)}
                                />
                            </div>
                        </div>
                        <button type='submit' >Add</button>
                        <button type='button' onClick={handleClose} style={{ backgroundColor: 'red' }}>Close</button>
                    </form>
                </Fade>
            </Modal>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={3000}
                onClose={handleCloseSnake}
                open={showMessage}
            >
                <Alert onClose={handleCloseSnake} severity="success">
                    Song Created
                </Alert>
            </Snackbar>
        </>
    )
}

export default AddSongForm;
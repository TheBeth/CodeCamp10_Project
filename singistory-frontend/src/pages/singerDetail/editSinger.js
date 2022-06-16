import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../css/newAlbum.css';
import axios from '../../config/axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { ErrorContext } from '../../context/ErrorContext';
import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material"

function EditSinger() {

    const navigate = useNavigate();
    const { singerId } = useParams();
    const [singer, setSinger] = useState([]);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [birthPlace, setBirthPlace] = useState('');
    const [title, setTitle] = useState('');
    const [website, setWebsite] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instragram, setInstragram] = useState('');
    const [youtube, setYoutube] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    const { setError } = useContext(ErrorContext);

    const fetchSinger = async () => {
        try {
            const res = await axios.get(`/singers/${singerId}`)
            setSinger(res.data.singerDetail)
        } catch (err) {
            setError(err.response.data.message)
        }
    }

    useEffect(() => {
        fetchSinger()
    }, []);

    const editSinger = async () => {
        try {
            await axios.patch(`/singers/${singerId}`,
                { firstName, lastName, birthDate, birthPlace, title, website, facebook, instragram, youtube })
            fetchSinger()
            navigate('/singer')
            setFirstName(singer.firstName)
        } catch (err) {
            setError(err.response.data.message)
        }
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        editSinger()
    }

    const handleCloseSnake = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowMessage(false);
    };

    let letterTitle
    if (title.length > 1000) {
        letterTitle = <p className='validate'>Title doesn't have letter more than 1000.</p>
    }

    return (
        <div className="newAlbumPage">
            <div className='back-to-page' style={{ width: '255px' }} onClick={() => navigate(-1)}>Back to Album</div>
            <div className="new-album-wrapper">
                <div className='new-album-main'>
                    <div className='new-album-header'>
                        <div className='new-album-header-text'>Edit Singer</div>
                        <form className='new-album-form' onSubmit={handleSubmitForm}>

                            <div className='row'>
                                <div className='col-25'>
                                    <label>First Name</label>
                                </div>
                                <div className='col-75'>
                                    <input
                                        type='text'
                                        placeholder={singer.firstName}
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-25'>
                                    <label>Last Name</label>
                                </div>
                                <div className='col-75'>
                                    <input
                                        type='text'
                                        placeholder={singer.lastName}
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-25'>
                                    <label>Birth Date</label>
                                </div>
                                <div className='col-75'>
                                    <input
                                        type='date'
                                        value={birthDate}
                                        onChange={e => setBirthDate(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-25'>
                                    <label>Birth Place</label>
                                </div>
                                <div className='col-75'>
                                    <input
                                        type='text'
                                        placeholder={singer.birthPlace}
                                        value={birthPlace}
                                        onChange={e => setBirthPlace(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-25'>
                                    <label>Title</label>
                                </div>
                                <div className='col-75'>
                                    <textarea
                                        type='text'
                                        placeholder={singer.title}
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                    />
                                    {letterTitle}
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-25'>
                                    <label>Website</label>
                                </div>
                                <div className='col-75'>
                                    <input
                                        type='text'
                                        placeholder={singer.website}
                                        value={website}
                                        onChange={e => setWebsite(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-25'>
                                    <label>Facebook</label>
                                </div>
                                <div className='col-75'>
                                    <input
                                        type='text'
                                        placeholder={singer.facebook}
                                        value={facebook}
                                        onChange={e => setFacebook(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-25'>
                                    <label>Instragram</label>
                                </div>
                                <div className='col-75'>
                                    <input
                                        type='text'
                                        placeholder={singer.instragram}
                                        value={instragram}
                                        onChange={e => setInstragram(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-25'>
                                    <label>Youtube</label>
                                </div>
                                <div className='col-75'>
                                    <input
                                        type='text'
                                        placeholder={singer.youtube}
                                        value={youtube}
                                        onChange={e => setYoutube(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type='submit'
                                disabled={!firstName || !birthDate || !birthPlace || title.length > 1000 || !title}
                            >
                                Edit
                            </button>
                        </form>
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
                    Award Created
                </Alert>
            </Snackbar>
        </div>
    )
}

export default EditSinger;
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorContext } from '../context/ErrorContext';
import '../css/newSinger.css';
import Spinner from '../utils/spinner';
import axios from '../config/axios';
import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material"

function NewSinger() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [birthPlace, setBirthPlace] = useState('');
    const [title, setTitle] = useState('');
    const [website, setWebsite] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instragram, setInstragram] = useState('');
    const [youtube, setYoutube] = useState('');
    const [singerImg, setSingerImg] = useState('');
    const [loading, setLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const navigate = useNavigate()
    const { setError } = useContext(ErrorContext);

    const createSinger = async () => {
        const formData = new FormData()
        formData.append('firstName', firstName)
        formData.append('lastName', lastName)
        formData.append('birthDate', birthDate)
        formData.append('birthPlace', birthPlace)
        formData.append('title', title)
        formData.append('website', website)
        formData.append('facebook', facebook)
        formData.append('instragram', instragram)
        formData.append('youtube', youtube)
        formData.append('singerImg', singerImg)

        try {
            setLoading(true)
            const res = await axios.post('/singers', formData)
            if(res){
                setShowMessage(true)
                setFirstName('')
                setLastName('')
                setBirthDate('')
                setBirthPlace('')
                setTitle('')
                setWebsite('')
                setFacebook('')
                setInstragram('')
                setYoutube('')
                setSingerImg('')
            }
        } catch (err) {
            setError(err.response.data.message);
        } finally {
            setLoading(false)
        }
    };

    const handleSubmitForm = async e => {
        e.preventDefault()
        createSinger()
    }

    const handleCloseSnake = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowMessage(false);
    };

    return (
        <div className="newSingerPage">
            {loading && <Spinner />}
            <div className='back-to-page' style={{ width: '255px' }} onClick={() => navigate(-1)}>Back to Profile</div>
            <div className="new-singer-wrapper">
                <div className='new-singer-main'>
                    <div className='new-singer-header'>
                        <div className='new-singer-header-text'>New Singer</div>
                        <form className='new-singer-form' onSubmit={handleSubmitForm}>

                            <div className='row'>
                                <div className='col-25'>
                                    <label for='firstName'>First Name</label>
                                </div>
                                <div className='col-75'>
                                    <input
                                        type='text'
                                        placeholder='First Name'
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-25'>
                                    <label for='lastName'>Last Name</label>
                                </div>
                                <div className='col-75'>
                                    <input
                                        type='text'
                                        placeholder='Last Name'
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-25'>
                                    <label for='date'>Birth Date</label>
                                </div>
                                <div className='col-75'>
                                    <input
                                        type='date'
                                        placeholder='Birth Date'
                                        value={birthDate}
                                        onChange={e => setBirthDate(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-25'>
                                    <label for='birthPlace'>Birth Place</label>
                                </div>
                                <div className='col-75'>
                                    <input
                                        type='text'
                                        placeholder='Birth Place'
                                        value={birthPlace}
                                        onChange={e => setBirthPlace(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-25'>
                                    <label for='detaiil'>Detail</label>
                                </div>
                                <div className='col-75'>
                                    <textarea
                                        type='text'
                                        placeholder='Detail'
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-25'>
                                    <label for='website'>Website</label>
                                </div>
                                <div className='col-75'>
                                    <input
                                        type='text'
                                        placeholder='website'
                                        value={website}
                                        onChange={e => setWebsite(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-25'>
                                    <label for='facebook'>Facebook</label>
                                </div>
                                <div className='col-75'>
                                    <input
                                        type='text'
                                        placeholder='Facebook'
                                        value={facebook}
                                        onChange={e => setFacebook(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-25'>
                                    <label for='instragram'>Instragram</label>
                                </div>
                                <div className='col-75'>
                                    <input
                                        type='text'
                                        placeholder='Instragram'
                                        value={instragram}
                                        onChange={e => setInstragram(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-25'>
                                    <label for='youtube'>Youtube</label>
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

                            <div className='row'>
                                <div className='col-25'>
                                    <label for='albumImg'>Album Image</label>
                                </div>
                                <div className='col-75s'>
                                    <input
                                        type='file'
                                        onChange={e => { if (e.target.files[0]) setSingerImg(e.target.files[0]) }}
                                    />
                                    <button type='reset'>Remove</button>
                                </div>
                            </div>
                            <button 
                            type='submit'
                            disabled={firstName === '' || birthDate === '' || birthPlace === '' || title === '' || title.length > 1000}
                            >
                                Confirm
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
                    Singer Created
                </Alert>
            </Snackbar>
        </div>
    )
}

export default NewSinger;
import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/newEvent.css';
import axios from '../config/axios';
import { ErrorContext } from '../context/ErrorContext';
import Spinner from '../utils/spinner';
import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material"

function NewEvent() {
    const { singerId } = useParams();
    const [title, setTitle] = useState('');
    const [stage, setStage] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [ticketSale, setTicketSale] = useState('');
    const [link, setLink] = useState('');
    const [posterImg, setPosterImg] = useState('');
    const [loading, setLoading] = useState(false)
    const [showMessage, setShowMessage] = useState(false);

    const navigate = useNavigate();

    const { setError } = useContext(ErrorContext)

    const createEvent = async () => {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('singerId', singerId)
        formData.append('stage', stage)
        formData.append('location', location)
        formData.append('date', date)
        formData.append('ticketSale', ticketSale)
        formData.append('link', link)
        formData.append('posterImg', posterImg)

        try {
            setLoading(true)
            const res = await axios.post('/event', formData)
            if (res) {
                setShowMessage(true)
                setTitle('')
                setStage('')
                setLocation('')
                setDate('')
                setTicketSale('')
                setLink('')
            }
        } catch (err) {
            setError(err.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmitForm = e => {
        e.preventDefault()
        createEvent()
    }

    const handleCloseSnake = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowMessage(false);
    };

    return (
        <div className="newEventPage">
            {loading && <Spinner />}
            <div className='back-to-page' style={{ width: '255px' }} onClick={() => navigate(-1)}>Back to Profile</div>
            <div className="new-event-wrapper">
                <div className='new-event-main'>
                    <div className='new-event-header'>
                        <div className='new-event-header-text'>New Event</div>
                        <form className='new-event-form' onSubmit={handleSubmitForm}>

                            <div className='row'>
                                <div className='col-25'>
                                    <label>Title</label>
                                </div>
                                <div className='col-75'>
                                    <input
                                        type='text'
                                        placeholder='Event Name'
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-25'>
                                    <label>Stage</label>
                                </div>
                                <div className='col-75'>
                                    <input
                                        type='text'
                                        placeholder='Stage'
                                        value={stage}
                                        onChange={e => setStage(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-25'>
                                    <label>Location</label>
                                </div>
                                <div className='col-75'>
                                    <input
                                        type='text'
                                        placeholder='Location'
                                        value={location}
                                        onChange={e => setLocation(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-25'>
                                    <label>Date</label>
                                </div>
                                <div className='col-75'>
                                    <input
                                        type='date'
                                        placeholder='Date'
                                        value={date}
                                        onChange={e => setDate(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-25'>
                                    <label>Ticket</label>
                                </div>
                                <div className='col-75'>
                                    <input
                                        type='text'
                                        placeholder='Ticket Sale'
                                        value={ticketSale}
                                        onChange={e => setTicketSale(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-25'>
                                    <label>Link</label>
                                </div>
                                <div className='col-75'>
                                    <input
                                        type='text'
                                        placeholder='Ticket Link'
                                        value={link}
                                        onChange={e => setLink(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-25'>
                                    <label>Poster</label>
                                </div>
                                <div className='col-75s'>
                                    <input
                                        type='file'
                                        onChange={e => { if (e.target.files[0]) setPosterImg(e.target.files[0]) }}
                                    />
                                    <button
                                        type='reset'
                                        onClick={() => {
                                            setTitle('')
                                            setStage('')
                                            setLocation('')
                                            setDate('')
                                            setTicketSale('')
                                            setLink('')
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                            <button type='submit'>Add Event</button>
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
                    Event Created
                </Alert>
            </Snackbar>
        </div>
    )
}

export default NewEvent;
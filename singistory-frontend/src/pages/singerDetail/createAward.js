import { useContext } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorContext } from "../../context/ErrorContext";
import axios from '../../config/axios';
import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material"

function CreateAward() {
    const { singerId } = useParams();
    const navigate = useNavigate()
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [role, setRole] = useState('');
    const [stage, setStage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    const { setError } = useContext(ErrorContext);

    const createAward = async () => {
        try {
            const res = await axios.post('/award', { title, year, role, stage, singerId: singerId })
            if(res){
                setShowMessage(true)
            }
        } catch (err) {
            setError(err.response.data.message)
        }finally{
            setTitle('')
            setYear('')
            setRole('')
            setStage('')
        }
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        createAward()
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
                <div className='back-to-page' style={{ width: '255px' }} onClick={() => navigate(-1)}>Back to Profile</div>
                <div className="new-album-wrapper">
                    <div className='new-album-main'>
                        <div className='new-album-header'>
                            <div className='new-album-header-text'>New Award</div>
                            <form className='new-album-form' onSubmit={handleSubmitForm} >

                                <div className='row'>
                                    <div className='col-25'>
                                        <label>Title</label>
                                    </div>
                                    <div className='col-75'>
                                        <input
                                            type='text'
                                            placeholder='Title'
                                            value={title}
                                            onChange={e => setTitle(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-25'>
                                        <label>Year</label>
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
                                        <label>Role</label>
                                    </div>
                                    <div className='col-75'>
                                        <input
                                            type='text'
                                            placeholder='Role'
                                            value={role}
                                            onChange={e => setRole(e.target.value)}
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

                                <button type='reset'>Remove</button>

                                <button type='submit'>New Award</button>
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
                    Award Created
                </Alert>
            </Snackbar>
        </>

    )
}

export default CreateAward;
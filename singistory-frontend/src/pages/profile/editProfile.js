import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import '../../css/editProfile.css';
import axios from '../../config/axios';
import { ErrorContext } from '../../context/ErrorContext';
import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material"


function EditProfile() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    const { user, updateUser } = useContext(AuthContext);
    const { setError } = useContext(ErrorContext);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.patch('/users/update-profile', { firstName, lastName, phoneNumber })
            if (res) {
                setShowMessage(true)
            }
            updateUser({ firstName: user.data.firstName, lastName: user.data.lastName, phoneNumber: user.data.phoneNumber })

        } catch (err) {
            setError(err.response.data.message)
        } finally {
            setFirstName('')
            setLastName('')
            setPhoneNumber('')
        }

    }

    console.log(user.phoneNumber)

    const navigate = useNavigate();

    const handleCloseSnake = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowMessage(false);
    };

    let phoneValidate
    if (phoneNumber === user.phoneNumber) {
        phoneValidate = <p className='validate'>You must to change New phone Number</p>
    }

    const numberFormat = /^\d+$/;
    const isNumber = numberFormat.test(phoneNumber)
    let numberValidate
    if (phoneNumber.length > 0) {
        if (!isNumber) {
            numberValidate = <p class='validate'>Not a Phone Number</p>
        }
    }

    return (
        <div className="editProfilePage">
            <div className='back-to-page' style={{ width: '255px' }} onClick={() => navigate(-1)}>Back to Profile</div>
            <div className="edit-profile-wrapper">
                <div className='edit-profile-main'>
                    <div className='edit-profile-header'>
                        <div className='edit-profile-header-text'>Edit Profile</div>
                        <form className='edit-profile-form' onSubmit={handleSubmit}>

                            <div className='row'>
                                <div className='col-25'>
                                    <label>First Name</label>
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
                                    <label>Last Name</label>
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
                                    <label>Phone Number</label>
                                </div>
                                <div className='col-75'>
                                    <input
                                        type='text'
                                        placeholder='Phone Number'
                                        value={phoneNumber}
                                        onChange={e => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                            </div>
                            {phoneValidate}
                            {numberValidate}

                            <button
                                type='submit'
                                disabled={phoneNumber === user.phoneNumber || firstName === '' || lastName === ''}
                            >
                                Submit
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
                    Profile is Edited
                </Alert>
            </Snackbar>
        </div>
    )
}

export default EditProfile;
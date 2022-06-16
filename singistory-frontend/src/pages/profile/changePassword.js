import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/editProfile.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from '../../config/axios';
import { useState } from 'react';
import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material"
import { ErrorContext } from '../../context/ErrorContext';


function ChangePassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setComfirmPassword] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    const { user, updateUser } = useContext(AuthContext);
    const { setError } = useContext(ErrorContext);

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.patch('/users/change-password', { email, password, confirmPassword })
            if (res) {
                setShowMessage(true)
            }
            updateUser({ password: user.data.password })
        } catch (err) {
            setError(err.response.data.message)
        } finally {
            setEmail('')
            setPassword('')
            setComfirmPassword('')
        }
    }

    const handleCloseSnake = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowMessage(false);
    };

    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isEmail = emailFormat.test(email)
    let emailValid
    if (email.length > 0) {
        if (!isEmail) {
            emailValid = <p className='validate'>Please input a valid email</p>
        }
    }

    let passwordValid
    if (confirmPassword.length > 0) {
        if (password !== confirmPassword) {
            passwordValid = <p className='validate' style={{backgroundColor:'rgb(0,0,0,0.2)'}}>Password not match Confirm Password</p>
        }
    }

    return (
        <>
            <div className="editProfilePage" >
                <div className='back-to-page' style={{ width: '255px' }} onClick={() => navigate(-1)}>Back to Profile</div>
                <div className="edit-profile-wrapper">
                    <div className='edit-profile-header-text'>Change Password</div>
                    <form className='edit-profile-form' onSubmit={handleSubmitForm}>
                        <div className='row'>
                            <div className='col-25'>
                                <label>Email</label>
                            </div>
                            <div className='col-75'>
                                <input
                                    type='text'
                                    placeholder='E-mail'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        {emailValid}
                        <div className='row'>
                            <div className='col-25'>
                                <label>Password</label>
                            </div>
                            <div className='col-75'>
                                <input
                                    style={{ borderRadius: '0px' }}
                                    type='password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-25'>
                                <label>Confirm Password</label>
                            </div>
                            <div className='col-75'>
                                <input
                                    type='password'
                                    style={{ borderRadius: '0px' }}
                                    placeholder='Confirm Password'
                                    value={confirmPassword}
                                    onChange={e => setComfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        {passwordValid}
                        <button
                            style={{ backgroundColor: '#f6a121', padding: '5px', width: '80px', textAlign: 'center', margin: 'auto', cursor: 'pointer' }}
                            disabled={password !== confirmPassword || password === ''}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>


            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={3000}
                onClose={handleCloseSnake}
                open={showMessage}
            >
                <Alert onClose={handleCloseSnake} severity="success">
                    Password Changed
                </Alert>
            </Snackbar>
        </>
    )
}

export default ChangePassword;
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/register.css'
import axios from '../config/axios';
import { ErrorContext } from '../context/ErrorContext';
import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material"



function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    const { setError } = useContext(ErrorContext)

    const navigate = useNavigate()



    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/users/register', { firstName, lastName, email, phoneNumber, password, confirmPassword });
            if (res) {
                setShowMessage(true)
            }
            navigate('/signin');
        } catch (err) {
            setError(err.response.data.message)
            console.log(err)
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
    if (password !== confirmPassword && confirmPassword !== '') {
        passwordValid = <p className='validate'>Password not match with Confirm Password</p>
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

        <div className="register-box">
            <div className="register-header">Register</div>
            <div className="register-form">
                <form className='form-regis-box' onSubmit={handleSubmitRegister}>
                    <input
                        type='text'
                        value={firstName}
                        placeholder='First Name'
                        style={{ width: '47%', marginRight: '6%' }}
                        onChange={e => setFirstName(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='Last Name'
                        style={{ width: '47%' }}
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='E-mail'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    {emailValid}
                    <input
                        type='text'
                        placeholder='Phone Number'
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                    />
                    {numberValidate}
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {passwordValid}
                    <button
                        style={{ height: '45px' }}
                        type='submit'
                        disabled={!firstName || !lastName || !isEmail || !isNumber}
                    >
                        REGISTER
                    </button>
                </form>
            </div>
            <div className="signin-header">Or Signin?</div>
            <div to='/signin'>
                <div className="signin-form">
                    <button
                        style={{ height: '45px' }}
                        type='submit'
                        onClick={() => {
                            navigate('/signin')
                        }}
                    >
                        SIGN IN
                    </button>
                </div>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={3000}
                onClose={handleCloseSnake}
                open={showMessage}
            >
                <Alert onClose={handleCloseSnake} severity="success">
                    User Created
                </Alert>
            </Snackbar>
        </div>


    )
}

export default Register;
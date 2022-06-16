import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../css/login.css'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useContext(AuthContext);


    const navigate = useNavigate();

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        login(email, password)
    }
    
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isEmail = emailFormat.test(email)
    let emailValid
    if (email.length > 0) {
        if (!isEmail) {
            emailValid = <p className='validate'>Not Email !!!</p>
        }
    }

    return (
        <div className="register-box">
            <div className="signin-header1">Welcome to Singistory</div>
            <div className="signin-header2">Have Account?</div>
            <div className="signin-form">
                <form className='form-signin-box' onSubmit={handleSubmitLogin}>
                    <input
                        type='text'
                        placeholder='E-mail'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    {emailValid}
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button style={{ height: '45px' }} type='submit'>SIGN IN</button>
                </form>
            </div>
            <div className="regis-ask-header">Don't have account</div>
            <div to='/register'>
                <div className="regis-ask-btn">
                    <button type='submit'
                        style={{ height: '45px' }}
                        onClick={() => navigate('/register')}>REGISTER</button>
                </div>
            </div>
        </div>
    )
}

export default Login;
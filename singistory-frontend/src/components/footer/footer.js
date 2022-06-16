import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../../css/footer.css';
import facebook from '../../asset/icon/fb.png';
import ig from '../../asset/icon/ig.png';
import line from '../../asset/icon/line.png';
import tw from '../../asset/icon/tw.png';
import gg from '../../asset/icon/gg.png';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


function Footer() {
    const form = useRef();

    const { user } = useContext(AuthContext)

    const sendEmail = (e) => {
        e.preventDefault()
        emailjs.sendForm('service_7ayj30q', 'template_h49hqw4', form.current, 'btusFOHoibsaf730i')
            .than(result => {
                console.log(result.text)
            }, error => {
                console.log(error.text)
            })
    }

    return (
        <>
            <div className='container'>
                <div className='footer-head'>
                    <div className='sub'>Subscribe now</div>
                    <form style={{ background: 'none', display: 'block', textAlign: 'center' }} ref={form} onSubmit={sendEmail}>
                        <input
                            type='text'
                            name={user.firstName}
                            placeholder='Input your Email'
                            style={{ width: '80%', background: 'none', borderStyle: 'none', padding: '5px 20px', margin: 'auto', textAlign: 'center', outline: 'none', borderBottom: '1px solid' }}>
                        </input>
                        <button name='send' onClick={() => alert('Thank for Subscribe')}>Subscribe</button>
                    </form>
                </div>
                <div className='footer-head'>
                    <div>Content</div>
                    <Link to='/singer'>
                        <div className='footer-sub'>Singer</div>
                    </Link>
                    <Link to='/genre'>
                        <div className='footer-sub'>Genre</div>
                    </Link>
                    <Link to='/Community'>
                        <div className='footer-sub'>Community</div>
                    </Link>
                </div>
                <div className='footer-head'>
                    <div>Information</div>
                    <Link to='/about'>
                        <div className='footer-sub'>About Us</div>
                    </Link>
                    <Link to='/community'>
                        <div className='footer-sub'>Blog</div>
                    </Link>
                    <Link to='/event'>
                        <div className='footer-sub'>Events</div>
                    </Link>
                </div>
                <div className='footer-head' >
                    <div>Contact Us</div>
                    <div className='footer-sub'>08X-XXX-XXXX</div>
                    <div className='footer-sub'>iseefire@singistory.com</div>
                </div>
                <div className='footer-head'>
                    <div className='sub'>Follow Our Socials</div>
                    <div className='footer-social' >
                        <img src={facebook} alt="fb" />
                        <img src={ig} alt="ig" />
                        <img src={tw} alt="tw" />
                        <img src={line} alt="line" />
                        <img src={gg} alt="gg" />
                    </div>
                </div>
                <br />
            </div>
            <div style={{ display: 'block', textAlign: 'center', width: '100%', height: '18px', fontSize: '12px', backgroundColor: '#e8e8e8' }}>
                © 2023 by TheBeth. Proudly created with TheBeth7625
            </div>
        </>
    )
}

export default Footer;
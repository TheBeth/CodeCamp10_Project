import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../../css/contact.css'
import fb from '../../asset/icon/fb.png'
import ig from '../../asset/icon/ig.png'
import tw from '../../asset/icon/tw.png'
import line from '../../asset/icon/line.png'
import gg from '../../asset/icon/gg.png'


function Contact() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_7ayj30q', 'template_lm786qt', form.current, 'btusFOHoibsaf730i')
            .then((result) => {
                console.log(result.text)
            }, (error) => {
                console.log(error.text)
            })
    }
    return (
        <div className='contactPage'>
            <h1 className='header'>Contact</h1>
            <div className="contact-box">
                <div className="contact-address-box">
                    <div className='contact-address-header-box'>Contact Us</div>
                    <div className='contact-address-details-box'>
                        <p>500 Terry Francois Street, </p>
                        <p>San Francisco, </p>
                        <p>CA 94158</p>
                        <br />
                        <p>08X-XXX-XXXX</p>
                        <br />
                        <p>iseefire@gmail.com</p>
                    </div>
                </div>
                <div className="contact-social-box">
                    <div className='contact-social-header-box'>
                        <a href='https://www.facebook.com/' target='_blank' rel="noreferrer">
                            <img src={fb} alt="fb" />
                        </a>
                        <a href='https://www.instagram.com/' target='_blank' rel="noreferrer">
                            <img src={ig} alt="ig" />
                        </a>
                        <a href='https://twitter.com/' target='_blank' rel="noreferrer">
                            <img src={tw} alt="tw" />
                        </a>
                        <a href='https://line.me/' target='_blank' rel="noreferrer">
                            <img src={line} alt="line" />
                        </a>
                        <a href='https://www.google.com/' target='_blank' rel="noreferrer">
                            <img src={gg} alt="gg" />
                        </a>
                    </div>
                    <div className='contact-social-details-box'>Our Socials</div>
                </div>
                <div className="contact-help-box">
                    <div className='contact-help-header-box'>How can we help you ?</div>
                    <div className='contact-help-details-box'>
                        <form className='form-help-box' ref={form} onSubmit={sendEmail}>
                            <label>Name</label>
                            <input type='text' name='user_name' />
                            <label>Surname</label>
                            <input type='text' name='user_lastName' />
                            <label>E-mail</label>
                            <input type='text' name='user_email' />
                            <label>Subject</label>
                            <input type='text' name='user_subject' />
                            <label >Message</label>
                            <textarea type='text' name='massage' />
                            <button value='send' style={{height:'auto'}} onClick={() => alert('We have receive your information')}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;
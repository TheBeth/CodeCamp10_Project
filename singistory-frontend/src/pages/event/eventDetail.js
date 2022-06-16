import '../../css/eventDetail.css'
import defaultImg from '../../asset/images/default-image.jpeg'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from '../../config/axios';
import { AuthContext } from '../../context/AuthContext';
import ConfirmDelete from './confirmDelete';

function EventDetail() {
    const { eventId } = useParams();
    const [eventDetail, setEventDetail] = useState([]);
    const [singerDetail, setSingerDetail] = useState([]);
    const [isInterest, setIsInterest] = useState([]);
    const [interest, setInterest] = useState(false);

    const { user } = useContext(AuthContext)

    const fetchEventDetail = async () => {
        try {
            const res = await axios.get(`/event/${eventId}`)
            setEventDetail(res.data)
            setSingerDetail(res.data.Singer);
        } catch (err) {
            console.log(err)
        }
    }
    const fetchInterest = async () => {
        try {
            const res = await axios.get(`/interest/${eventId}`)
            if (res.data.userId === user.id) {
                setInterest(true)
                setIsInterest(res.data.id)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const createInterest = async () => {
        try{
            await axios.post('/interest', {eventId:eventId})
            setInterest(true)
        }catch(err){
            console.log(err)
        }
    }

    const deleteInterest = async (id) => {
        try{
            await axios.delete(`/interest/${id}`)
            setInterest(false)
        }catch(err){
            console.log(err)
        }
    }

    const deleteEvent = async (id) => {
        try{
            axios.delete(`/event/${eventId}`)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchEventDetail()
        fetchInterest()
    }, []);

    let interestButton
    if (!interest) {
        interestButton = <button onClick={createInterest}>Interest</button>
    } else {
        interestButton = <button onClick={() => deleteInterest(isInterest)}>Interested</button>
    }

    const { title, date, stage, location, ticketSale, posterImg, link } = eventDetail;
    const { firstName, lastName } = singerDetail;

    const navigate = useNavigate();

    let adminBtn
    if(user.firstName === 'Admin'){
        adminBtn = <ConfirmDelete deleteEvent={deleteEvent} eventDetail={eventDetail}/>
    }

    return (
        <div className="eventDetailPage">
            <div className='back-to-page' onClick={() => navigate(-1)}>Back to Events</div>
            <div className="event-detail-wrapper">
                <div className='event-detail-card'>
                    <div className='event-detail-card-left'>
                        <img src={posterImg ?? defaultImg} alt='weekend' />
                        <button type='submit'>
                            <a href={link} target='_blank' rel='noreferrer'>Buy Ticket</a>
                        </button>
                        {interestButton}
                    </div>
                    <div className='event-detail-card-right'>
                        <div className='event-detail-header'>{title}</div>
                        <p>Singer : {firstName} {lastName}</p>
                        <p>Date : {date}</p>
                        <p>Stage : {stage}</p>
                        <p>Location : {location}</p>
                        <p>Ticket Sale : {ticketSale}</p>
                    </div>
                </div>
                {adminBtn}
            </div>
        </div>
    )
}

export default EventDetail;
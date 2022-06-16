import { useEffect, useState } from 'react';
import axios from '../../config/axios';
import '../../css/eventList.css';
import EventAll from './eventAll';


function EventList() {
    const [allEvent, setAllEvent] = useState([]);


    const fetchEvent = async () => {
        try {
            const res = await axios.get('/event')
            setAllEvent(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchEvent()
    }, []);

    

    return (
        <div className="eventListPage">
            <div className="event-wrapper">
                <h1>Events</h1>
                <div className='all-event-list'>
                    <EventAll allEvent={allEvent} />
                </div>
            </div>
        </div>
    )
}

export default EventList
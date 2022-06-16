import EventScrolling from '../../components/eventScrolling';

function InterestEvent({userDetails:{Interests}}) {
    return (
        <div className='interest-event-profile'>
            <h1>Interest Event</h1>
            <EventScrolling interests={Interests}/>
        </div>
    )
}

export default InterestEvent;
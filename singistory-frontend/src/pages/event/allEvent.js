import EventItem from './eventItem';

function AllEvent({ interest }) {
    return (
        
            <div>
                {interest && interest.map(item => (
                    <EventItem key={item.id} event={item.Event} />
                ))}
            </div>
        
    );
}

export default AllEvent;
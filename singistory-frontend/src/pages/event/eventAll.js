import EventAllItem from "./eventAllItem";

function EventAll({ allEvent }) {
    return (
        <>
            {allEvent && allEvent.map(item => (
                <EventAllItem key={item.id} event={item} />
            ))}
        </>
    )
}

export default EventAll;
import timeSince from '../../service/timeSince';

function CommunityUpdated({time:{updatedAt}}) {
   
    return(
        <div className='community-one-singer-right'>last update : {timeSince(updatedAt)}</div>
    )
}
export default CommunityUpdated;
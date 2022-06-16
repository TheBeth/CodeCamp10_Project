import AwardAccording from '../../components/award/According';

function AwardCard({singerDetail:{Awards}}) {
    return (
        <div className='award-card'>
            <div className='award-header'>Awards</div>
            <div className='award-list'>
                <AwardAccording awards={Awards}/>
            </div>
        </div>
    )
}

export default AwardCard;
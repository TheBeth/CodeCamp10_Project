import SingerItem from './singerItem'

function SingerAllList({singerList}) {
    return (
        <>
        {singerList.map(item => (
            <SingerItem key={item.id} singer={item}/>
        ))}
        </>
    )
}

export default SingerAllList
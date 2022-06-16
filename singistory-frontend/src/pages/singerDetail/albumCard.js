import AlbumCardItem from "./albumCardItem";

function AlbumCard({ singerDetail }) {
    return (
        <div className='album-card'>
            <div className='album-card-header'>Albums</div>
            <div className='album-list'>
                {singerDetail.map(item => (
                    <AlbumCardItem key={item.id} album={item} />
                ))}
            </div>
        </div>
    )
}

export default AlbumCard;
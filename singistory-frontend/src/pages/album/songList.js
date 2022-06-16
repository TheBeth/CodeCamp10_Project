import AlbumListItem from "./albumListItem";


function SongList({album:{Songs}}) {
    return (
        <div className='song-list'>
            <div className='song-list-header'>Title</div>
            <div className='song-list-table'>
                <table>
                    <tr className='song-table-title'>
                        <th >Track</th>
                        <th >Genre</th>
                        <th >Streaming</th>
                    </tr>
                    {Songs && Songs.map(item => (
                        <AlbumListItem key={item.id} song={item} />
                    ))}
                </table>
            </div>
        </div>
    )
}

export default SongList;
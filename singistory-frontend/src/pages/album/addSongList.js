import AddSongListItem from "./addSongItem";

function AddSongList({ song }) {
    return (
        <>
            {song && song.map(item => (
                <AddSongListItem key={item.id} list={item} />
            ))}
        </>
    )
}

export default AddSongList;
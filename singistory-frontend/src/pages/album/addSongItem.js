import DeleteSong from "./deleteSong";
import axios from '../../config/axios';
import { useState } from "react";
import { useContext } from "react";
import { ErrorContext } from "../../context/ErrorContext";
import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material"

function AddSongListItem({ list: { id, songName, Genres } }) {
    const [showForm, setShowForm] = useState(false)
    const [genreType, setGenreType] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    const toggleShowForm = () => {
        setShowForm(prev => !prev);
    }

    const { setError } = useContext(ErrorContext);

    const createGenre = async () => {
        try {
            const res = await axios.post('/genre', { genreType, songId: id })
            if (res) {
                setShowMessage(true)
            }
        } catch (err) {
            setError(err.response.data.message)
        }
    }

    const deleteSong = async () => {
        try {
            await axios.delete(`/song/${id}`)
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        createGenre()
        setShowForm(false)
    }

    const handleCloseSnake = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowMessage(false);
    };

    return (
        <>
            <div className='edit-album-song'>
                <div className='edit-one-song'>{songName}</div>
                <DeleteSong deleteSong={deleteSong} />
            </div >
            <div style={{ display: 'flex' }}>
                <div onClick={toggleShowForm} style={{cursor:'pointer'}}>Add Genre</div>
                {showForm &&
                    <form onSubmit={handleSubmit} style={{margin:'0 5px'}}>
                        {/* <input
                            type='text'
                            placeholder="Add Genre...."
                            value={genreType}
                            onChange={e => setGenreType(e.target.value)}
                        /> */}
                        <select onChange={e => setGenreType(e.target.value)}>
                            <option value="ROCK">Rock</option>
                            <option value="POP">Pop</option>
                            <option value="COUNTRY">Country</option>
                            <option value="EDM">EDM</option>
                            <option value="RNB">R&B</option>
                            <option value="JAZZ">Jazz</option>
                            <option value="HIPHOP">Hip Hop</option>
                            <option value="FOLK">Folk</option>
                        </select>
                        <button type="submit">Add</button>
                    </form>}
            </div>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={3000}
                onClose={handleCloseSnake}
                open={showMessage}
            >
                <Alert onClose={handleCloseSnake} severity="success">
                    Genre Created
                </Alert>
            </Snackbar>
        </>
    )
}

export default AddSongListItem
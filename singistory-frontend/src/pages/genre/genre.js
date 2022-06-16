import '../../css/genre.css'
import pop from '../../asset/genre/pop.jpeg';
import rock from '../../asset/genre/rock.jpeg';
import country from '../../asset/genre/country.jpeg';
import edm from '../../asset/genre/edm.jpg'
import folkpop from '../../asset/genre/folkPop.jpeg';
import hiphop from '../../asset/genre/hiphop.png';
import rnb from '../../asset/genre/rnb.jpeg'
import jazz from '../../asset/genre/jazz.jpeg';
import { useState, useEffect } from 'react';
import axios from '../../config/axios';
import { Link } from 'react-router-dom';

function Genre() {
    const [genre, setGenre] = useState('')
    const [genreList, setGenreList] = useState([])

    const fetchGenre = async () => {
        try {
            const res = await axios.get(`/genre/genreType?genreType=` + genre)
            setGenreList(res.data.genreList)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchGenre()
    }, [genre]);

    let songList
    if (genre === '') {
        songList = <h1>Choose you genre above this message</h1>
    } else if (genreList.length === 0) {
        songList = <h1>No song Available</h1>
    } else {
        songList = <table>
            {genreList.map(item => (
                <tr className='song-genre-detail'>
                    <td style={{ textAlign: 'left' }}>{item.Song.songName}</td>
                    <Link to={`/singer/${item.Song.Singer.id}`}>
                        <td style={{ textAlign: 'center', color: 'white', fontSize: '1.5vw', padding: '10px' }}>{item.Song.Singer.firstName} {item.Song.Singer.lastName}</td>
                    </Link>
                    <td style={{ textAlign: 'right' }}>{item.Song.Album.albumName}</td>
                </tr>
            ))}
        </table>
    }

    return (
        <div className="genrePage">
            <div className="genre-wrapper">
                <h1>Genre</h1>
                <div className='genre-list'>
                    <div className='genre-icon'>
                        <img src={pop} alt='Pop'
                            onClick={() => {
                                setGenre('POP')
                                fetchGenre()
                            }} />
                        <p>POP</p>
                    </div>
                    <div className='genre-icon'>
                        <img src={rock} alt='Rock'
                            onClick={() => {
                                setGenre('ROCK')
                                fetchGenre()
                            }} />
                        <p>Rock</p>
                    </div>
                    <div className='genre-icon'>
                        <img src={country} alt='Country'
                            onClick={() => {
                                setGenre('COUNTRY')
                                fetchGenre()
                            }} />
                        <p>Country</p>
                    </div>
                    <div className='genre-icon'>
                        <img src={edm} alt='EDM'
                            onClick={() => {
                                setGenre('EDM')
                                fetchGenre()
                            }} />
                        <p>EDM</p>
                    </div>
                    <div className='genre-icon'>
                        <img src={folkpop} alt='FolkPop'
                            onClick={() => {
                                setGenre('FOLK')
                                fetchGenre()
                            }} />
                        <p>Folk Pop</p>
                    </div>
                    <div className='genre-icon'>
                        <img src={hiphop} alt='HipHop'
                            onClick={() => {
                                setGenre('HIPHOP')
                                fetchGenre()
                            }} />
                        <p>Hip Hop</p>
                    </div>
                    <div className='genre-icon'>
                        <img src={jazz} alt='Jazz'
                            onClick={() => {
                                setGenre('JAZZ')
                                fetchGenre()
                            }} />
                        <p>Jazz</p>
                    </div>
                    <div className='genre-icon'>
                        <img src={rnb} alt='Rnb'
                            onClick={() => {
                                setGenre('RNB')
                                fetchGenre()
                            }} />
                        <p>R&B</p>
                    </div>

                </div>
                <div className='genre-song'>
                    <div className='genre-select-header'>{genre}</div>
                    {songList}
                </div>
            </div>
        </div>
    )
}

export default Genre;
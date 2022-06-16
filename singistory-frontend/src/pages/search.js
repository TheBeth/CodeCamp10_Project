import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/genre.css'
import axios from '../config/axios';
import { useEffect } from 'react';

function Search() {
    const { search } = useParams();
    const [searchInput, setSearchInput] = useState([])
    const [searchSinger, setSearchSinger] = useState('')
    

    const fetchSearch = async () => {
        try {
            const res = await axios.get(`/singers/searchName?searchName=${searchSinger || search}`)
            if(searchSinger.length > 0){
                setSearchInput(res.data.singer)
            }
        } catch (err) {
            console.log(err)
        }
    }

    // if(searchSinger.length == 0){
    //     setSearchInput('')
    // }

    useEffect(() => {
        fetchSearch()
    }, []);

    let searchData
    if (searchInput.length === 0) {
        searchData = <h2 style={{ color: 'white', marginLeft: '30px' }} > Search not found</h2>
    } else {
        searchData =
            <>
                {searchInput.map(item => (
                    <Link to={`/singer/${item.id}`}>
                        <h2 style={{ color: 'white', marginLeft: '30px' }} key={item.id}>{item.firstName} {item.lastName}</h2>
                    </Link>
                ))}
            </>
    }

    const handleSubmit = e => {
        e.preventDefault()
        // navigate(`/search/${search}`)
    }

    return (
        <div className="genrePage">
            <div className="genre-wrapper">
                <h1>Search</h1>
                <div className='genre-song'>
                <form onSubmit={handleSubmit}>
                        <input 
                        style={{margin:'3.5px'}}
                        type="text" 
                        class="input-search" 
                        placeholder="Type to Search..."
                        value={searchSinger}
                        onChange={e => 
                            {setSearchSinger(e.target.value)
                            fetchSearch()}
                        }
                        />
                </form>
                    <div className='genre-select-header'>You search '{searchSinger || search}'</div>
                    {searchData}
                </div>
            </div>
        </div>
    )
}

export default Search;
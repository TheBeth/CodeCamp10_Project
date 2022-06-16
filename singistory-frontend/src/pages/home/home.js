import * as React from 'react';
import background from '../../asset/cover/background.jpeg'
import ed from '../../asset/images/ed.jpeg'
import taylor from '../../asset/images/taylor.jpeg'
import bambam from '../../asset/images/bambam.jpeg'
import jisoo from '../../asset/images/jisoo.jpeg'
import lisa from '../../asset/images/lisa.jpeg'
import event from '../../asset/cover/event.jpg'
import genre from '../../asset/cover/genre.jpg'
import community from '../../asset/cover/community.jpg'
import '../../css/home.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Home() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    const handleSubmit = e => {
        e.preventDefault()
        navigate(`/search/${search}`)
    }

    return (
        <div className='homePage'>
            <div className='header-cover'>
                <img src={background} alt="Cover" />
                    <div class="search-box">
                {/* <Link to='/profile'> */}
                        <button class="btn-search"><i className="search"></i></button>
                {/* </Link> */}
                <form onSubmit={handleSubmit}>
                        <input 
                        type="text" 
                        class="input-search" 
                        placeholder="Type to Search..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        />
                </form>
                    </div>

            </div>
            <div className='singer-home-box'>
                <div className='singer-img-box'>
                    <Link to='/singer/3' className='singer-home'>
                        <img src={ed} className="image" alt='ed' />
                        <p>Ed Sheeran</p>
                    </Link>
                    <Link to='/singer/4' className='singer-home'>
                        <img src={taylor} className="image" alt='taylor' />
                        <p>Taylor Swift</p>
                    </Link>
                    <Link to='/singer/1' className='singer-home'>
                        <img src={bambam} className="image" alt='bambam' />
                        <p>Kanpimook Bhuwakul</p>
                    </Link>
                </div>
                <div className='singer-img-box'>
                    <Link to='/singer/6' className='singer-home'>
                        <img src={jisoo} className="image" alt='jisoo' />
                        <p>Kim Ji Soo</p>
                    </Link>
                    <Link to='/singer/5' className='singer-home'>
                        <img src={lisa} className="image" alt='passenger' />
                        <p>Lalisa Manobal</p>
                    </Link>
                    <Link to='singer' className='singer-home'>
                        <div class="btn btn-three">
                            <span>More Singer</span>
                        </div>
                    </Link>
                </div>
            </div>
            <div className='other'>
                <Link to='/event' className='other-box'>
                    <img src={event} alt='event' />
                    <h2>Coming Up Events</h2>
                </Link>
                <Link to='/genre' className='other-box'>
                    <img src={genre} alt='genre' />
                    <h2>Genre</h2>
                </Link>
                <Link to='/community' className='other-box'>
                    <img src={community} alt='community' />
                    <h2>Community</h2>
                </Link>
            </div>
        </div>
    )
}

export default Home;
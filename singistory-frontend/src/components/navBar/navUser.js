import '../../css/nav.css'
import { Link, useNavigate } from 'react-router-dom';
import defaultImage from '../../asset/images/default-image.jpeg';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useState } from 'react';

function NavUser() {
    const [search, setSearch] = useState([])
    const { logOut, user } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        navigate(`/search/${search}`)
        setSearch('')
    }

    return (
        <div>
            <div className="navbar">
                <form onSubmit={handleSubmit}>
                        <input 
                        style={{margin:'3.5px'}}
                        type="text" 
                        class="input-search" 
                        placeholder="Type to Search..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        />
                </form>
                <ul className='ul-navbar'>
                    <li><Link to="/">Home</Link> </li>
                    <li class="dropdown">
                        <Link to="/singer" class="dropbtn">Singer</Link>
                        <div class="dropdown-content">
                            <Link to="/genre">Genre</Link>
                            <Link to="/event">Events</Link>
                            <Link to="/community">Community</Link>
                        </div>
                    </li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to='/community'>Community</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li class="dropdown">
                        <Link to="/profile" class="dropbtn" style={{ padding: '5px 20px', alignItems: 'center' }}>
                            <img src={user.profileImg ?? defaultImage} alt='userImg' style={{ height: '35px', margin: '0px', padding: '0px', borderRadius: '50%' }} />
                        </Link>
                        <div class="dropdown-content" style={{ right: '0px' }}>
                            <li><Link to='profile'>Welcome {user.firstName} {user.lastName}</Link></li>
                            <li><Link to='editprofile'>Edit Profile</Link></li>
                            <li><a href='' onClick={() => logOut()}>Logout</a></li>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default NavUser
import '../../css/nav.css'
import logo from '../../asset/logo/logo-s-white.png'
import { Link } from 'react-router-dom';

function NavHome() {
  return (
    <div>
      <div className="navbar">
        <Link to='/main' className='navbar' >
          <img src={logo} alt='logo'/>
        </Link>
        <ul className='ul-navbar'>
          <li><a href="/">Home</a></li>
          <li><a href="/register">Register</a></li>
          <li><a href="/signin">Sign In</a></li>
        </ul>
      </div>
    </div>
  );
}

export default NavHome
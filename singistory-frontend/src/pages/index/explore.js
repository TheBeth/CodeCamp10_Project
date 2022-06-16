import '../../css/explore.css'
import logo from '../../asset/logo/logo-white.png'
import { Link } from 'react-router-dom';

function Explore() {
    return (
        <>
            <div className='logo-index'>
                <img src={logo} alt="logo" />
            </div>
            <Link to='/signin'>
                <div className='explore-btn' style={{ position: 'absolute', top: '70%', left: '45%'}}>
                    <div style={{height:'50px'}} class="custom-btn btn-3"><span>Explore More</span></div>
                </div>
            </Link>
        </>
    )
}

export default Explore;
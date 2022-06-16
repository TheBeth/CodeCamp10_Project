import { useContext } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import DeleteSinger from './deleteSinger';
import axios from '../../config/axios';


function SingerFooter() {
    const { singerId } = useParams();
    const navigate = useNavigate()

    const { user } = useContext(AuthContext)

    const deleteSinger = async () => {
        try {
            await axios.delete(`/singers/${singerId}`)
        } catch (err) {
            console.log(err.response.data.message)
        }
    }

    let adminButton
    if (user.firstName === 'Admin') {
        adminButton = (<>
            <Link to={`/editsinger/${singerId}`}>
                <button>Edit Singer</button>
            </Link>
            <Link to={`/newalbum/${singerId}`}>
                <button>New Album</button>
            </Link>
            <Link to={`/newevent/${singerId}`}>
                <button>New Event</button>
            </Link>
            <Link to={`/createaward/${singerId}`}>
                <button>New Award</button>
            </Link>
            <DeleteSinger deleteSinger={deleteSinger} />
        </>
        )
    }


    return (
        <div className='button-buttom'>
            <div to='/singer' className='button-buttom'>
                <button onClick={() => { navigate(-1) }}>Back to Singer</button>
            </div>
            <div className='button-buttom'>
                {adminButton}
            </div>
        </div>
    )
}

export default SingerFooter;
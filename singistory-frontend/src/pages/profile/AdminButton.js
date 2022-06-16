import {useNavigate} from 'react-router-dom'

function AdminButton() {

const navigate = useNavigate()

    return (
        <div className='admin-edit-btn' style={{display:'flex'}}>
            <div className='admin-edit-btn'>
                <button onClick={() => navigate('/newsinger')}>New Singer</button>
            </div>
            <div className='admin-edit-btn'>
                <button onClick={() => navigate('/newsinger')}>Add genre</button>
            </div>
        </div>
    )
}

export default AdminButton;
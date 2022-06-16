import defaultImg from '../../asset/images/default-image.jpeg';
import { Link, useNavigate } from 'react-router-dom'
import DeleteUser from './deleteUser';
import axios from '../../config/axios';
import { useState } from 'react';
import { Backdrop } from '@mui/material';
import Modal from '@mui/material/Modal';
import Spinner from '../../utils/spinner';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function UserDetail({ userDetails: { firstName, lastName, email, phoneNumber } }) {

    // const deleteUser = async () => {
    //     try{
    //         await axios.delete('/users')
    //     }catch(err){
    //         console.log(err)
    //     }
    // }
    const [open, setOpen] = useState(false);
    const [imgInput, setImgInput] = useState('')
    const [loading, setLoading] = useState(false)

    const { user, updateUser } = useContext(AuthContext);

    const handleUpdate = async () => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('profileImg', imgInput)

            const res = await axios.patch('/users/profile-img', formData)
            updateUser({ profileImg: res.data.profileImg })
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {loading && <Spinner />}
            <div className='event-detail-card'>
                <div className='event-detail-card-left'>
                    <img src={user.profileImg ?? defaultImg} alt='weekend' />
                    <div style={{ display: 'flex', margin: '0' }}>
                        <Link to='/editprofile' className='event-detail-card-left'>
                            <button type='submit' disabled={user.firstName === 'Admin'} style={{ margin: 'auto' }}>Edit Profile</button>
                        </Link>
                        <Link to='/changepassword' className='event-detail-card-left'>
                            <button type='submit' disabled={user.firstName === 'Admin'} style={{ margin: 'auto' }}>Edit Profile</button>
                        </Link>
                        <div to='/editprofile' className='event-detail-card-left'>
                            <button type='submit' style={{ margin: 'auto', width: 'auto' }} onClick={() => setOpen(true)} >Change Profile Image</button>
                        </div>
                        {/* <DeleteUser deleteUser={deleteUser}/> */}
                    </div>
                </div>
                <div className='event-detail-card-right'>
                    <div className='event-detail-header'>{firstName} {lastName}</div>
                    <p>First Name : {firstName}</p>
                    <p>Last Name : {lastName}</p>
                    <p>E-mail : {email}</p>
                    <p>Password : *********</p>
                    <p>Phone Number : {phoneNumber}</p>
                </div>
            </div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <div className="newPostPage">
                    <div className='new-post-header'>
                        <div className='new-post-header-text'>Change Profile Image</div>
                        <form className='new-post-form' onSubmit={handleUpdate}>
                            <div className='row'>
                                <div className='col-25'>
                                    <label for='title'>Image</label>
                                </div>
                                <div className='col-75'>
                                    <input
                                        style={{ height: '25px' }}
                                        type='file'
                                        onChange={e => {
                                            if (e.target.files[0]) setImgInput(e.target.files[0]);
                                        }}
                                    />
                                    <img
                                        src={
                                            imgInput
                                                ? URL.createObjectURL(imgInput)
                                                : user.profileImg ?? defaultImg
                                        }
                                        width="auto"
                                        height="200"

                                        alt="user"
                                    />
                                </div>
                            </div>
                            <button
                                type='submit'
                                disabled={!imgInput}
                            >
                                Change
                            </button>
                        </form>
                        <button
                            type='button'
                            onClick={() => {
                                setOpen(false)
                                setImgInput(null)
                            }}
                        >Close</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default UserDetail;
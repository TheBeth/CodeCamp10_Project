import '../../css/communitySinger.css'
import { useState } from 'react';
import { Backdrop } from '@mui/material';
import Modal from '@mui/material/Modal';

function CommunityForm({ createPost }) {
    const [open, setOpen] = useState(false);
    const [header, setHeader] = useState('');
    const [title, setTitle] = useState('');
    const [img, setImg] = useState('');

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        await createPost(header, title, img)
        setOpen(false)
        setHeader('')
        setTitle('')
        setImg('')
    }



    return (
        <>
            <button onClick={() => setOpen(true)}>Add new post</button>
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
                        <div className='new-post-header-text'>Create your new post</div>
                        <form className='new-post-form' onSubmit={handleSubmitForm}>
                            <div className='row'>
                                <div className='col-25'>
                                    <label for='title'>Header</label>
                                </div>
                                <div className='col-75'>
                                    <input
                                        type='text'
                                        placeholder='Header'
                                        value={header}
                                        onChange={e => setHeader(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-25'>
                                    <label for='detail'>Title</label>
                                </div>
                                <div className='col-75'>
                                    <textarea type='text'
                                        placeholder='Title'
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-25'>
                                    <label for='image'>Image</label>
                                </div>
                                <div className='col-75s'>
                                    <input
                                        type='file'
                                        onChange={e => {
                                            if (e.target.files[0]) setImg(e.target.files[0]);
                                        }}
                                    />
                                    <button type='reset'>Remove</button>
                                </div>
                            </div>
                            <button type='submit'>Post</button>
                        </form>
                        <button
                            type='button'
                            onClick={() => {
                                setOpen(false)
                            }}
                        >Close</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default CommunityForm;
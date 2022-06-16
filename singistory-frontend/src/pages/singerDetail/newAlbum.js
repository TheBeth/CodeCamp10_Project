// import '../../css/newAlbum.css'
// import Modal from '@mui/material/Modal';
// import { useState } from 'react';


// function NewSingerAlbum({ createAlbum }) {
//     const [albumName, setAlbumName] = useState('');
//     const [year, setYear] = useState('');
//     const [track, setTrack] = useState('');
//     const [img, setImg] = useState('');
//     const [open, setOpen] = useState(false);

//     const handleSubmitForm = async (e) => {
//         e.preventDefault()
//         await createAlbum(albumName, track, img, year)
//         setOpen(false)
//     }


//     return (
//         <>
//             <button onClick={() => setOpen(true)}>New Album</button>
//             <Modal
//                 open={open}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             >
//                 <div className="newAlbumPage">
//                     <div className="new-album-wrapper">
//                         <div className='new-album-main'>
//                             <div className='new-album-header'>
//                                 <div className='new-album-header-text'>New Album</div>
//                                 <form className='new-album-form' onSubmit={handleSubmitForm}>

//                                     <div className='row'>
//                                         <div className='col-25'>
//                                             <label>Album Name</label>
//                                         </div>
//                                         <div className='col-75'>
//                                             <input
//                                                 type='text'
//                                                 placeholder='Album Name'
//                                                 value={albumName}
//                                                 onChange={e => setAlbumName(e.target.value)}
//                                             />
//                                         </div>
//                                     </div>

//                                     <div className='row'>
//                                         <div className='col-25'>
//                                             <label>Year</label>
//                                         </div>
//                                         <div className='col-75'>
//                                             <input
//                                                 type='text'
//                                                 placeholder='Year'
//                                                 value={year}
//                                                 onChange={e => setYear(e.target.value)}
//                                             />
//                                         </div>
//                                     </div>

//                                     <div className='row'>
//                                         <div className='col-25'>
//                                             <label>Track</label>
//                                         </div>
//                                         <div className='col-75'>
//                                             <input
//                                                 type='text'
//                                                 placeholder='Track'
//                                                 value={track}
//                                                 onChange={e => setTrack(e.target.value)}
//                                             />
//                                         </div>
//                                     </div>

//                                     <div className='row'>
//                                         <div className='col-25'>
//                                             <label>Album Image</label>
//                                         </div>
//                                         <div className='col-75s'>
//                                             <input
//                                                 type='file'
//                                                 onChange={e => {
//                                                     if (e.target.files[0]) setImg(e.target.files[0]);
//                                                     console.log(e.target.files)
//                                                 }}
//                                             />
//                                             <button type='reset'>Remove</button>
//                                         </div>
//                                     </div>
//                                     <button type='submit'>New Album</button>
//                                 </form>
//                             </div>
//                         </div>
//                         <button
//                             type='button'
//                             onClick={() => {
//                                 setOpen(false)
//                             }}
//                         >Close</button>
//                     </div>
//                 </div>
//             </Modal>
//         </>
//     )
// }

// export default NewSingerAlbum;
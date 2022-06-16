import defaultImg from '../../asset/images/default-image.jpeg';
import fb from '../../asset/icon/fb.png';
import yt from '../../asset/icon/youtube.png'
import www from '../../asset/icon/www.png';
import ig from '../../asset/icon/ig.png'
import { useState, useContext, useEffect } from 'react';
import axios from '../../config/axios'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function SingerCard({ singerDetail: { firstName, lastName, singerImg, birthDate, birthPlace, title, facebook, youtube, instragram, website } }) {
    const [follow, setFollow] = useState(false);
    const [followBtn, setFollowBtn] = useState([]);
    const { singerId } = useParams();

    const { user } = useContext(AuthContext)

    // let userID = user.id
    const getFollow = async () => {
        try {
            const res = await axios.get(`follow/${singerId}`)
            // let user = res.data.find(function(post,index){  //find userId in array of object to match with user.id
            //     if(post.userId === userID){
            //         setFollow(true)
            //     }
            // })
            if (res.data.userId === user.id) {
                setFollow(true)
                setFollowBtn(res.data.id)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const createFollow = async () => {
        try{
            await axios.post('/follow' , {singerId:singerId})
            setFollow(true)
        }catch(err){
            console.log(err)
        }
    }

    const deleteFollow = async (id) => {
        try{
            await axios.delete(`/follow/${id}`)
            setFollow(false)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getFollow()
    }, [])

    let followButton
    if (!follow) {
        followButton = <button onClick={createFollow}>Follow</button>
    } else {
        followButton = <button onClick={() => deleteFollow(followBtn)}>Followed</button>
    }


    return (
        <div className='detail-card'>
            <div className="singer-detail-card">
                <img src={singerImg ?? defaultImg} alt="ed" />
                <div className='singer-detail-card-name'>
                    <div className='singer-detail-header-main'>{firstName} {lastName}</div>
                    <div className='singer-detail-dob'>
                        <p>Date of Birth : {birthDate}</p>
                        <p>Country : {birthPlace}</p>
                    </div>
                    <div className='singer-detail-personal'>
                        <p>{title}</p>
                    </div>
                </div>
            </div>
            <div className='singer-detail-social'>
                <div className='singer-social'>
                    <div className='follow-singer-social'>Follow Singer on social</div>
                    <div className='singer-detail-logo'>
                        <a href={facebook} target='_blank' rel="noreferrer">
                            <img src={fb} alt='fb' />
                        </a>
                        <a href={youtube} target='_blank' rel="noreferrer">
                            <img src={yt} alt='yt' />
                        </a>
                        <a href={website} target='_blank' rel="noreferrer">
                            <img src={www} alt='www' />
                        </a>
                        <a href={instragram} target='_blank' rel="noreferrer">
                            <img src={ig} alt='ig' />
                        </a>
                    </div>
                    {followButton}
                </div>
            </div>
        </div>
    )
}

export default SingerCard;
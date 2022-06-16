import * as React from 'react';
import '../../css/eventDetail.css'
import UserDetail from './userDetail';
import AdminButton from './AdminButton';
import FollowSinger from './FollowSinger';
import InterestEvent from './interestEvent';
import { useState } from 'react';
import axios from '../../config/axios';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Profile() {
    

    const [userDetail, setUserDetail] = useState([]);

    const {user} = useContext(AuthContext)

    const fetchDetail= async () => {
        try{
            const res = await axios.get('/users');
            setUserDetail(res.data.user)
            console.log(res.data.user.Follows)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchDetail();
    },[]);

    let adminButton
    if(user.firstName === 'Admin'){
        adminButton = <AdminButton />
    }


    return (
        <div className="eventDetailPage">
            <h1>Profile</h1>
            <div className="event-detail-wrapper">
                <UserDetail userDetails={userDetail}/>
                {adminButton}
                <FollowSinger userDetails={userDetail}/>
                <InterestEvent userDetails={userDetail}/>
            </div>
        </div>
    )
}

export default Profile;
import '../../css/communityMain.css'
import CommunityMainList from './communityMainList';
import axios from '../../config/axios'
import { useEffect,useState } from 'react';

function CommunityMain() {

    const [community, setCommunity] = useState([]);

    const fetchCommunity = async () => {
        try{
            const res = await axios.get('/posts')
            setCommunity(res.data)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchCommunity()
    },[])

    return (
        <div className="communityMainPage">
            <div className="community-main-wrapper">
                <h1>Community</h1>
                <CommunityMainList community={community}/>
            </div>
        </div>
    )
}

export default CommunityMain;
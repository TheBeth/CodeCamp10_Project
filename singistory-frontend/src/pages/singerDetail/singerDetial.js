import '../../css/singerDetail.css'
import SingerCard from './singerCard';
import AlbumCard from './albumCard';
import AwardCard from './awardCard';
import SingerFooter from './singerDetailFooter';
import { useState,useEffect } from 'react';
import axios from '../../config/axios';
import { useParams } from 'react-router-dom';

function SingerDetail() {
    const { singerId } = useParams();
    const [singerDetail, setSingerDetail] = useState([]);
    const [albumList, setAlbumList] = useState([]);

    const fetchSingerDetail = async () => {
        try {
            const res = await axios.get(`/singers/${singerId}`)
            setSingerDetail(res.data.singerDetail)
            setAlbumList(res.data.singerDetail.Albums)
        } catch (err) {
            console.log(err)
        }    
    }    

    useEffect(() => {
        fetchSingerDetail()
    }, []);    


    return (
        <div className='singerDetailPage'>
            <div className="singer-detail-wrapper">
                <SingerCard singerDetail={singerDetail} />
                <AlbumCard singerDetail={albumList} />
                <AwardCard singerDetail={singerDetail} />
            </div>
            <SingerFooter/>
            
        </div>
    )
}

export default SingerDetail;
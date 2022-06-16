import { useEffect } from 'react';
import { useState } from 'react';
import '../../css/singerList.css'
import SingerAllList from './singerAllList';
import axios from '../../config/axios'

function SingerList() {

    const [singerList, setSingerList] = useState([])

    const fetchSinger = async () => {
        try{
            const res = await axios.get('/singers')
            setSingerList(res.data)
        }catch(err){
            console.log(err)
        }
    }
    
    useEffect(() => {
        fetchSinger()
    },[]);

    return (
        <div className='singerList'>
            <h1>SINGER</h1>
            <div style={{backgroundColor:'#323c51'}}>
            <div className='singer-wrapper'>
                <SingerAllList singerList={singerList}/>
            </div>
            </div>
        </div>
    )
}

export default SingerList;
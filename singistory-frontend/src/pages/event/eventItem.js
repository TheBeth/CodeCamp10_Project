import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import defaultImg from '../../asset/images/default-image.jpeg'
import { Link } from 'react-router-dom';



function EventItem({ event: { id, posterImg, title, stage, date } }) {



    return ( 
        <Link to={`/event/${id}`}>
            <div style={{ width: '400px', height: '300px', backgroundColor: 'white', padding:'0', color:'black', borderRadius:'5px'}}>
                <img src={posterImg ?? defaultImg} style={{width:'100%', height:'150px', objectFit:'cover', borderRadius:'5px', marginBottom:'10px'}}/>
                <Typography gutterBottom variant="h6" component="div" >{title}</Typography>
                <Typography variant="body2" color="text.secondary" >{stage}</Typography>
                <Typography variant="body2" color="text.secondary" >{date}</Typography>
                <Link to={`/event/${id}`}><Button>Detail</Button></Link>
            </div>
        </Link>
    )
}

export default EventItem;
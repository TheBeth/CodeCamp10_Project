import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import defaultImg from '../../asset/images/default-image.jpeg'
import { Link } from 'react-router-dom';
// import Link from '@mui/material/Link';


function EventAllItem({ event: { id, title, stage, date, posterImg } }) {

    return (
        // <Link component={RouterLink} to={`/event/${id}`}>
        // <Card sx={{ maxWidth: "23%", margin: 1.5, cursor: 'pointer' ,padding:'0'}}>
        //     <CardActionArea>
        //         <CardMedia
        //             component="img"
        //             height="auto"
        //             image={posterImg ?? defaultImg}
        //             alt="equals"
        //         />
        //         <CardContent>
        //             <Typography gutterBottom variant="h6" component="div" >
        //                 {title}
        //             </Typography>
        //             <Typography variant="body2" color="text.secondary">
        //                 {stage}
        //             </Typography>
        //             <Typography variant="body2" color="text.secondary">
        //                 {date}
        //             </Typography>
        //         </CardContent>
        //     </CardActionArea>
        // </Card>        
        // </Link>
        <Link to={`/event/${id}`}>
                <div
                    style={{ width: '400px', height: '300px', backgroundColor: 'white', padding: '0', color: 'black', borderRadius: '5px', margin: '5px' }}>
                    <img src={posterImg ?? defaultImg} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '5px', marginBottom: '10px' }} />
                    <Typography gutterBottom variant="h6" component="div" sx={{ margin: '0 10px' }}>{title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ margin: '0 10px' }}>{stage}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ margin: '0 10px' }}>{date}</Typography>
                </div>
        </Link>
    )
}

export default EventAllItem;
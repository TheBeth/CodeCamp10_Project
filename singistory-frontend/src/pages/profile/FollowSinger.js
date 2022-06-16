import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FollowList from './followList';

function FollowSinger({userDetails : {Follows}}) {
    return (
        <div className='interest-singer'>
            <div style={{ width: '100%', margin: 'auto', backgroundColor: '#323C51' }}>
                <Accordion style={{ color: 'white', backgroundColor: '#323C51', width: '100%' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ backgroundColor: '#323C51', width: '100%' }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{ backgroundColor: '#323C51', width: '100%' }}
                    >
                        <Typography style={{ backgroundColor: '#323C51' , fontSize:'30px'}}>Follow Singer</Typography>
                    </AccordionSummary >
                    <AccordionDetails style={{ backgroundColor: '#323C51' }}>
                        <Typography>
                            <FollowList follow={Follows}/>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    )
}

export default FollowSinger;
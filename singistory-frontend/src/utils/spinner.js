import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Backdrop } from '@mui/material';


function Spinner() {
    return (
        <Box
            sx={{ display: 'flex', alignItems: 'center', gap: '5px', zIndex: '1500', position: 'absolute', left: '45%', top: '50%' }}
            BackdropComponent={Backdrop}
        >
            <CircularProgress size='4rem' />
            <Typography sx={{ color: 'white' }}>
                Loading
            </Typography>
        </Box>
    );
}

export default Spinner;
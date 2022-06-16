import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function TableAward({award}) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table" style={{color:'white'}}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align='center'>Year</StyledTableCell>
                        <StyledTableCell align="center">Title&nbsp;</StyledTableCell>
                        <StyledTableCell align="center">Stage&nbsp;</StyledTableCell>
                        <StyledTableCell align="center">Role&nbsp;</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {award && award.map((rows) => (
                        <StyledTableRow key={rows.year} >
                            <StyledTableCell component="th" scope="row" align='center' style={{color:'white', backgroundColor:'#576582'}}>
                                {rows.year}
                            </StyledTableCell>
                            <StyledTableCell style={{color:'white', backgroundColor:'#576582'}} >{rows.title}</StyledTableCell>
                            <StyledTableCell style={{color:'white', backgroundColor:'#576582'}} >{rows.stage}</StyledTableCell>
                            <StyledTableCell align='center' style={{color:'white', backgroundColor:'#576582'}}>{rows.role}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableAward;
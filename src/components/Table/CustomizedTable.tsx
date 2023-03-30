import * as React from 'react';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FeedbackRoundedIcon from '@mui/icons-material/FeedbackRounded';
import Table from '@mui/material/Table';


//MUI CONFIG

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#398b93",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: "#398b937a",
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function dateConverter(date: Date) {
    return date.toString().split(' ').slice(0, 4).join(' ')
}


// CUSTOMIZED TABLE COMPONENT

export const CustomizedTable = (props: any) => {

    const { rows } = props
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Ticket Created</StyledTableCell>
                        <StyledTableCell align="center">Ticket Status</StyledTableCell>
                        <StyledTableCell align="center">Last Update</StyledTableCell>
                        <StyledTableCell align="center">Title</StyledTableCell>
                        <StyledTableCell align="center">Response</StyledTableCell>
                        <StyledTableCell align="center">Project</StyledTableCell>
                        <StyledTableCell align="center">Company</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row: any) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell align="center">{dateConverter(row.created)}</StyledTableCell>
                            <StyledTableCell align="center">{row.status}</StyledTableCell>
                            <StyledTableCell align="center">{dateConverter(row.last_update)}</StyledTableCell>
                            <StyledTableCell align="center">{row.title}</StyledTableCell>
                            <StyledTableCell align="center"><FeedbackRoundedIcon /></StyledTableCell>
                            <StyledTableCell align="center">{row.project}</StyledTableCell>
                            <StyledTableCell align="center">{row.company}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}
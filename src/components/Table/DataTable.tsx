import react, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { styled } from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';
import FeedbackRoundedIcon from '@mui/icons-material/FeedbackRounded';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

export function dateConverter(date: Date) {
    return date.toString().split(' ').slice(0, 4).join(' ')
}

function createData(id: number, created: Date, status: string, last_update: Date, title: string, response: string, project: string, company: string) {
    return { id, created, status, last_update, title, response, project, company };
}

export const data = [
    createData(1, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 2', 'company 1'),
    createData(2, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 2', 'company 1'),
    createData(3, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 112', 'company 2'),
    createData(4, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 21', 'company 3'),
    createData(5, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(6, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(7, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(8, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(9, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(10, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(11, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(12, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(13, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(14, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(15, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(16, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(17, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(18, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(19, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(20, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(21, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(22, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(23, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(24, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(25, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(26, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(27, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(28, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(29, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
];


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#398b93",
        color: theme.palette.common.white,
        fontSize: 18
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: "#398b937a",
    },
    '&:last-child td': {
        border: 0,
    },
}));
export default function DataTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell align="center">Ticket Created</StyledTableCell>
                        <StyledTableCell align="center">Ticket Status</StyledTableCell>
                        <StyledTableCell align="center">Last Update</StyledTableCell>
                        <StyledTableCell align="center">Title</StyledTableCell>
                        <StyledTableCell align="center">Response</StyledTableCell>
                        <StyledTableCell align="center">Project</StyledTableCell>
                        <StyledTableCell align="center">Company</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : data
                    ).map((row) => (
                        <StyledTableRow key={row.id}>
                            <TableCell align="center">{dateConverter(row.created)}</TableCell>
                            <TableCell align="center">{row.status}</TableCell>
                            <TableCell align="center">{dateConverter(row.last_update)}</TableCell>
                            <TableCell align="center">{row.title}</TableCell>
                            <TableCell align="center"><FeedbackRoundedIcon /></TableCell>
                            <TableCell align="center">{row.project}</TableCell>
                            <TableCell align="center">{row.company}</TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={10}
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}
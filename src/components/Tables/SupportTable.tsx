import { useState, useEffect } from 'react';
import './AllTables.css'
import { useNavigate } from 'react-router-dom';
//CUSTOM COMPONENTS
import Loader from '../Loader/Loader';
//LOCAL HELPERS
import { dateConverter } from '../../helpers/dateConverter'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { Ticket } from '../../interfaces';
import { setSelectedTicket } from '../../features/user/userSlice';
import { allTicketsCall } from '../../helpers/apiCalls';
//MUI COMPONENTS AND TYPES
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
//MUI ICONS
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

interface SupportTableProps {
    selectedCompany: string
    selectedProject: string
    selectedStatus: string
    selectedPriority: string
    selectedType: string
    query: string
    timeTableFrom: Date
    timeTableTo: Date
}

export default function SupportTable(props: SupportTableProps) {
    const allTickets = useAppSelector((state: RootState) => state.user.allTickets)
    const token = useAppSelector((state: RootState) => state.user.JWT)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { selectedCompany, selectedProject,
        selectedPriority, selectedStatus, selectedType,
        query, timeTableFrom, timeTableTo } = props

    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(-1);
    const [filteredData, setFilteredData] = useState<Ticket[]>([])

    useEffect(() => {
        filterFetchedData()
    }, [selectedCompany, selectedPriority, selectedProject, selectedStatus, selectedType, query, timeTableFrom, timeTableTo, allTickets])


    function filterFetchedData() {
        let filtered = allTickets.filter((ticket: Ticket) => {
            const created = new Date(ticket.created).getTime();
            const from = new Date(timeTableFrom ? timeTableFrom : new Date('2023-01-01T08:51')).getTime();
            const to = new Date(timeTableTo ? timeTableTo : new Date('2030-01-01T08:53')).getTime();
            return created >= from && created <= to;
        });
        if (selectedCompany === 'Sve' && selectedProject === 'Svi' && selectedPriority === 'Svi' && selectedType === 'Svi' && !query && Number(selectedStatus) !== 4) {
            filtered = filtered.filter((ticket: Ticket) => ticket.ticketStatus.ticketStatusId !== 4)
        }
        if (selectedCompany !== 'Sve') {
            filtered = filtered.filter((ticket: Ticket) => ticket.companyProjectUser.companyProjectUserName.slice(0, ticket.companyProjectUser.companyProjectUserName.indexOf('-')) === selectedCompany)
        }
        if (selectedProject !== 'Svi') {
            filtered = filtered.filter((ticket: Ticket) => ticket.companyProjectUser.companyProjectUserName.slice(ticket.companyProjectUser.companyProjectUserName.indexOf('-') + 1, ticket.companyProjectUser.companyProjectUserName.lastIndexOf('-')) === selectedProject)
        }
        if (selectedStatus !== 'Svi') {
            filtered = filtered.filter((ticket: Ticket) => ticket.ticketStatus.ticketStatusId === Number(selectedStatus))
        }
        if (selectedPriority !== 'Svi') {
            filtered = filtered.filter((ticket: Ticket) => ticket.ticketPriority.ticketPriorityId === Number(selectedPriority))
        }
        if (selectedType !== 'Svi') {
            filtered = filtered.filter((ticket: Ticket) => ticket.ticketType.ticketTypeId === Number(selectedType))
        }
        setFilteredData(filtered)
    }

    //MUI CONFIG
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

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#19467c",
            color: theme.palette.common.white,
            fontSize: 18
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        }
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: "#19467c2a",
        },
        '&:last-child td': {
            border: 0,
        },
        '&:hover': {
            backgroundColor: "#f9a235",
        }
    }));
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

    //handle ticket open
    function handleSingleTicketOpen(id: string, ticket: Ticket) {
        dispatch(setSelectedTicket(ticket))
        navigate(`/ticket/${id}`)
    }


    return (
        <TableContainer component={Paper}>
            {!filteredData && <span style={{ position: 'absolute', bottom: '50%', right: '50%', fontSize: '18px' }}>nema kreiranih tiketa</span>}
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell align="center">Projekat</StyledTableCell>
                        <StyledTableCell align="center">Tiket kreiran</StyledTableCell>
                        <StyledTableCell align="center">Korisnikovo ime</StyledTableCell>
                        <StyledTableCell align="center">Naslov</StyledTableCell>
                        <StyledTableCell align="center">Prioritet</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                        <StyledTableCell align="center">Tip</StyledTableCell>
                        <StyledTableCell align="center">Poslednja promena</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody sx={{ color: 'white' }}>
                    {filteredData?.length > 0 && ((rowsPerPage > 0
                        ? filteredData?.filter((ticket: Ticket) => ticket.creator.firstName.toLowerCase().includes(query) || ticket.creator.lastName.toLowerCase().includes(query)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : filteredData?.filter((ticket: Ticket) => ticket.creator.firstName.toLowerCase().includes(query) || ticket.creator.lastName.toLowerCase().includes(query))
                    ).map((row: Ticket) => (
                        <StyledTableRow key={row.ticketId} onClick={() => handleSingleTicketOpen(row.ticketId, row)}>
                            <TableCell align="center">{row.companyProjectUser.companyProjectUserName.slice(0, row.companyProjectUser.companyProjectUserName.lastIndexOf('-'))}</TableCell>
                            <TableCell align="center">{dateConverter(row.created)}</TableCell>
                            <TableCell align="center">{row.creator.firstName} {row.creator.lastName}</TableCell>
                            <TableCell align="center">{row.title}</TableCell>
                            <TableCell align="center" className='table_cell'>{row.ticketPriority.ticketPriorityName}</TableCell>
                            <TableCell align="center" className='table_cell'>{row.ticketStatus.ticketStatusName}</TableCell>
                            <TableCell align="center" className='table_cell'>{row.ticketType.ticketTypeName}</TableCell>
                            <TableCell align="center">{dateConverter(row.lastUpdated)}</TableCell>
                        </StyledTableRow>
                    )).reverse())}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={10}
                            count={filteredData?.length}
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
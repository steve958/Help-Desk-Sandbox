import react, { useState, useEffect } from "react";
import "./AllTables.css";
//LOCAL HELPERS
import { deleteProjectCall, allCompProjConnectionCall } from "../../helpers/apiCalls";
import { useAppSelector } from "../../app/hooks";
import { CompanyProject, Project } from "../../interfaces";
//MUI COMPONENTS AND TYPES
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Tooltip from '@mui/material/Tooltip';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
//MUI ICONS
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import CableIcon from '@mui/icons-material/Cable';
import PeopleIcon from '@mui/icons-material/People';
import DeleteIcon from '@mui/icons-material/Delete';

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number
    ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#19467c",
        color: theme.palette.common.white,
        fontSize: 18,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: "#19467c4a",
    },
    "&:last-child td": {
        border: 0,
    },
}));

interface ProjectsTableProps {
    data: Project[] | []
    setSuccessMessage: React.Dispatch<React.SetStateAction<string>>
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
}


export default function ProjectsTable(props: ProjectsTableProps) {
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [deleteId, setDeleteId] = useState<string>('')
    const [deleteProjectName, setDeleteProjectName] = useState<string>('')
    const [selectedProject, setSelectedProject] = useState<string>('')
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showCompanyConnections, setShowCompanyConnections] = useState<boolean>(false)
    const [connectionsList, setConnectionsList] = useState<CompanyProject[] | []>([])
    const token = useAppSelector(state => state.user.JWT)

    useEffect(() => {
        fetchAllConnections()
    }, [])

    //MUI CONFIG
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    //fetch connection in order to prevent latency
    async function fetchAllConnections() {
        const list = await allCompProjConnectionCall(token)
        if (list) {
            setConnectionsList(list)
        }
    }

    //handle delete project click
    function handleDeleteProject(id: string, projectName: string) {
        setShowModal(true)
        setDeleteId(id)
        setDeleteProjectName(projectName)
    }

    //handle project delete
    async function projectDelete(id: string) {
        const response = await deleteProjectCall(token, id)
        if (response) {
            setShowModal(false)
            props.setSuccessMessage('Uspešno obrisan projekat')
        } else {
            setShowModal(false)
            props.setErrorMessage('Došlo je do greške')
        }
    }

    //filter connection based on selected project
    function filterConnections() {
        return connectionsList.filter((connection: CompanyProject) => connection.projectId === selectedProject)
    }

    return (
        <TableContainer component={Paper}>
            {/*delete project modal*/}
            {showModal && <Dialog open={showModal} onClose={() => setShowModal(false)}>
                <DialogContent>
                    <div>
                        <p style={{ fontSize: '25px', fontWeight: '600', color: '#19467c', textAlign: 'center' }}>{`Da li Ste sigurni da želite da obrišete projekat ${deleteProjectName}?`}</p>
                    </div>
                </DialogContent>
                <DialogActions style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        style={{
                            width: "200px",
                            backgroundColor: "red",
                            color: "white",
                            marginBottom: '10px'
                        }}
                        onClick={() => projectDelete(deleteId)}
                    >
                        Da
                    </Button>
                    <Button
                        variant="contained"
                        style={{
                            width: "200px",
                            backgroundColor: "#19467c",
                            color: "white",
                            marginBottom: '10px'
                        }}
                        onClick={() => setShowModal(false)}
                    >
                        Ne
                    </Button>
                </DialogActions>
            </Dialog>}
            {/*show company connections modal*/}
            {showCompanyConnections && <Dialog open={showCompanyConnections} onClose={() => setShowCompanyConnections(false)}>
                <DialogContent>
                    <div>
                        {filterConnections().length > 0 ? filterConnections().map((connection: CompanyProject) => {
                            return <p key={connection.companyProjectId}>{connection.companyProjectName}</p>
                        }) : <p>Nema povezanih kompanija</p>}
                    </div>
                </DialogContent>
                <DialogActions style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        style={{
                            width: "200px",
                            backgroundColor: "#19467c",
                            color: "white",
                            marginBottom: '10px'
                        }}
                        onClick={() => setShowCompanyConnections(false)}
                    >
                        Zatvori prikaz
                    </Button>
                </DialogActions>
            </Dialog>}
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell align="center">Ime projekta</StyledTableCell>
                        <StyledTableCell align="center">Uvezane kompanije</StyledTableCell>
                        <StyledTableCell align="center">Lista korisnika</StyledTableCell>
                        <StyledTableCell align="center">Obrisati projekat</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody sx={{ color: "white" }}>
                    {(props.data.length > 0 && rowsPerPage > 0
                        ? props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : props.data
                    ).map((project: Project) => {
                        return <StyledTableRow key={project.projectId}>
                            <TableCell align="center">{project.projectName}</TableCell>
                            <TableCell align="center">
                                <Tooltip title='KLIKNI DA VIDIŠ POVEZANE KOMPANIJE'>
                                    <span onClick={() => { setShowCompanyConnections(true); setSelectedProject(project.projectId) }}>
                                        <CableIcon style={{ color: "#19467c" }} />
                                    </span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="center">
                                <Tooltip title='KLIKNI DA VIDIŠ POVEZANE KORISNIKE'>
                                    <span>
                                        <PeopleIcon style={{ color: "#19467c" }} />
                                    </span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="center" >
                                <Tooltip title="KLIKNI DA OBRIŠEŠ KOMPANIJU">
                                    <span onClick={() => handleDeleteProject(project.projectId, project.projectName)}>
                                        <DeleteIcon style={{ color: "#19467c" }} />
                                    </span>
                                </Tooltip>
                            </TableCell>
                        </StyledTableRow>
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                            colSpan={10}
                            count={props.data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    "aria-label": "rows per page",
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

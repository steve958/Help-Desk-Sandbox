import react, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./AllTables.css";
//LOCAL HELPERS
import { CompanyProjectUser, User } from "../../interfaces";
import { allCompProjUserConnectionCall, allUsersCall, deleteUserCall } from "../../helpers/apiCalls";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { setSelectedUser } from "../../features/user/userSlice";
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
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import TableHead from "@mui/material/TableHead";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Tooltip from '@mui/material/Tooltip';
//MUI ICONS
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import CableIcon from '@mui/icons-material/Cable';
import DeleteIcon from '@mui/icons-material/Delete';

interface UsersTableProps {
  query: string
  data: User[]
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
  selectedType: string
}

export default function UsersTable(props: UsersTableProps) {

  const { query, data, setErrorMessage, setSuccessMessage, selectedType } = props

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(-1);
  const [filteredList, setFilteredList] = useState<User[]>(data)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [deleteUserId, setDeleteUserId] = useState<string>('')
  const [selectedUserName, setSelectedUserName] = useState<string>('')
  const [showConnections, setShowConnections] = useState<boolean>(false)
  const [selectedUserId, setSelectedUserId] = useState<string>('')
  const [connectionsList, setConnectionsList] = useState<CompanyProjectUser[] | []>([])

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const token = useAppSelector((state: RootState) => state.user.JWT)

  useEffect(() => {
    fetchAllConnections()
    if (data.length === 0) {
      fetchAllUsers()
    }
  }, [])

  useEffect(() => {
    if (selectedType === 'Svi') {
      setFilteredList(data)
    } else {
      const filtered = data.filter((user: User) => user.userType.userTypeName === selectedType)
      setFilteredList(filtered)
    }
  }, [selectedType, data])

  //MUI CONFIG
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
      backgroundColor: "#19467c2a",
    },
    "&:last-child td": {
      border: 0
    },
    '&:hover': {
      backgroundColor: "#f9a235",
    }
  }));

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

  //handle user delete click 
  function handleUserDeleteClick(row: User) {
    if (row.userId !== '13656f4e-d780-42e1-a13e-c30e8ee4f753') {
      setShowModal(true)
      setDeleteUserId(row.userId)
      setSelectedUserName(row.username)
    }
  }


  //fetch all connections between user and company/projects
  async function fetchAllConnections() {
    const list = await allCompProjUserConnectionCall(token)
    if (list) {
      setConnectionsList(list)
    }
  }

  //handle user delete
  async function userDelete(id: string) {
    const response = await deleteUserCall(token, id)
    if (response) {
      setSuccessMessage('Uspešno obrisan korisnik')
      setShowModal(false)
      const element = document.getElementsByClassName('app_container')
      element[0].scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      setErrorMessage('Došlo je do greške')
      setShowModal(false)
      const element = document.getElementsByClassName('app_container')
      element[0].scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

  }

  //fetch all users for the first render in case data from props comes empty
  async function fetchAllUsers() {
    const list = await allUsersCall(token)
    setFilteredList(list)
  }


  //filter connection based on selected user
  function filterConnections() {
    return connectionsList.filter((connection: CompanyProjectUser) => connection.userId === selectedUserId)
  }

  //handle user edit click 
  function userEdit(event: Event, user: User) {
    event.stopPropagation()
    dispatch(setSelectedUser(user))
    navigate(`/client/${user.userId}`)
  }

  return (
    <TableContainer component={Paper}>
      {/*delete user modal*/}
      {showModal && <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogContent>
          <div>
            <p style={{ fontSize: '25px', fontWeight: '600', color: '#19467c', textAlign: 'center' }}>{`Da li Ste sigurni da želite da obrišete korisnika ${selectedUserName}?`}</p>
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
            onClick={() => userDelete(deleteUserId)}
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
      {/*show connections modal*/}
      {showConnections && <Dialog open={showConnections} onClose={() => setShowConnections(false)}>
        <DialogContent>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <p style={{ color: '#19467c', fontWeight: '600' }}>{selectedUserName.toUpperCase()}</p>
            {filterConnections().length > 0 ? filterConnections().map((connection: CompanyProjectUser) => {
              return <span key={connection.companyProjectUserId} className="connection_display"><p>{connection.companyProjectUserName.slice(0, connection.companyProjectUserName.lastIndexOf('-'))}</p></span>
            }) : <p>Nema povezanih projekata i kompanija</p>}
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
            onClick={() => setShowConnections(false)}
          >
            Zatvori prikaz
          </Button>
        </DialogActions>
      </Dialog>}
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell align="center">Korisničko ime</StyledTableCell>
            <StyledTableCell align="center">Ime</StyledTableCell>
            <StyledTableCell align="center">Prezime</StyledTableCell>
            <StyledTableCell align="center">E-mail</StyledTableCell>
            <StyledTableCell align="center">Broj telefona</StyledTableCell>
            <StyledTableCell align="center">Tip korisnika</StyledTableCell>
            <StyledTableCell align="center">Projekti i kompanije</StyledTableCell>
            <StyledTableCell align="center">Obrisati korisnika</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody sx={{ color: "white" }}>
          {filteredList.length > 0 && ((rowsPerPage > 0
            ? filteredList.filter((user: User) => user.firstName.toLowerCase().includes(query) || user.lastName.toLowerCase().includes(query)).slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )
            : filteredList.filter((user: User) => user.firstName.toLowerCase().includes(query) || user.lastName.toLowerCase().includes(query))
          ).map((row: User | any) => (
            <StyledTableRow key={row.userId} onClick={(e: Event) => userEdit(e, row)}>
              <TableCell align="center">{row.username}</TableCell>
              <TableCell align="center">{row.firstName}</TableCell>
              <TableCell align="center">{row.lastName}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.phone}</TableCell>
              <TableCell align="center">{row.userType.userTypeName}</TableCell>
              <TableCell align="center">
                <span onClick={(e: any) => { e.stopPropagation(); setSelectedUserId(row.userId); setShowConnections(true); setSelectedUserName(row.username) }}>
                  <Tooltip title="KLIKNI DA VIDIŠ POVEZANE KOMPANIJE I PROJEKTE">
                    <CableIcon className="icon_cable" />
                  </Tooltip>
                </span>
              </TableCell>
              <TableCell align="center">
                <span onClick={(e: any) => { e.stopPropagation(); handleUserDeleteClick(row) }}>
                  {row.userId !== '13656f4e-d780-42e1-a13e-c30e8ee4f753' ? <Tooltip title="KLIKNI DA OBRIŠEŠ KORISNIKA">
                    <DeleteIcon className="icon_people" />
                  </Tooltip> : <Tooltip title="NEMOGUĆE OBRISATI ADMINA">
                    <DeleteIcon className="icon_people_disabled" />
                  </Tooltip>}
                </span>
              </TableCell>
            </StyledTableRow>
          )).reverse())}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={10}
              count={filteredList.length}
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

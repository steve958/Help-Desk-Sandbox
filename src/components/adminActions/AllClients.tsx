import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
//CUSTOM COMPONENTS
import Toolbar from "../Toolbar/Toolbar";
import UserProfile from "../UserProfile/UserProfile";
import { AdminFilterSelect } from "../Filters/AdminFilterSelect";
//LOCAL HELPERS
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { allUsersCall } from "../../helpers/apiCalls";
import { User } from "../../interfaces";
//MUI COMPONENTS AND TYPES
import InputAdornment from "@mui/material/InputAdornment";
import { OutlinedInput } from "@mui/material";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
//MUI ICONS
import SearchIcon from "@mui/icons-material/Search";
import PeopleIcon from '@mui/icons-material/People';
import FilterListIcon from '@mui/icons-material/FilterList';
import UsersTable from "../Tables/UsersTable";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


const AllClients = () => {
  const token = useAppSelector((state: RootState) => state.user.JWT)
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [usersList, setUsersList] = useState<User[] | []>([])
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("Svi");
  const navigate = useNavigate();

  useEffect(() => {
    if (successMessage || errorMessage) {
      setTimeout(() => { setSuccessMessage(''); setErrorMessage('') }, 4000)
    }
    fetchAllUsers()
  }, [successMessage, errorMessage])

  async function fetchAllUsers() {
    const list = await allUsersCall(token)
    setUsersList(list)
  }

  //MUI CONFIG
  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText("#398b93"),
    backgroundColor: "#f9a235",
    padding: '14px',
    "&:hover": {
      backgroundColor: "#19467c",
    },
  }));

  return (
    <div className="app_container">
      <Toolbar
        handleClickAccount={() => {
          if (token) setShowUserProfile(true);
        }}
      />
      <UserProfile
        show={showUserProfile}
        onClose={() => setShowUserProfile(false)}
      />
      <div className="content_container">
        <span className="heading_icon_wrapper">
          <h3 className="headings">Filteri</h3>
          <FilterListIcon style={{ color: '#19467c' }} />
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "95%",
            alignItems: "center",
          }}
        >
          <span style={{
            display: 'flex',
            width: '35%',
            justifyContent: 'space-between',
          }}>
            <OutlinedInput
              id="input-with-icon-adornment"
              style={{ width: "400px" }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              type="text"
              placeholder="Pretraži po korisničkom imenu"
              onChange={(e) => {
                setQuery(e.target.value.toLowerCase());
              }}
            />
            <AdminFilterSelect selectedType={selectedType} setSelectedType={setSelectedType} />
          </span>
          <span style={{ position: 'absolute', width: '300px', left: '40%', fontWeight: '600' }}>
            {successMessage &&
              <span style={{ display: 'flex', alignItems: 'center', color: 'green' }}>
                <CheckCircleOutlineIcon style={{ color: 'green', marginRight: '6px' }} />
                <p>{successMessage}</p>
              </span>}
            {errorMessage &&
              <span style={{ display: "flex", alignItems: 'center', color: 'red' }}>
                <ErrorOutlineIcon style={{ color: 'red', marginRight: '6px' }} />
                <p>{errorMessage}</p>
              </span>}
          </span>
          <ColorButton
            onClick={() => {
              navigate("/newclient");
            }}
          >
            Dodaj novog korisnika / podršku
          </ColorButton>
        </div>
        <span className="heading_icon_wrapper">
          <h3 className="headings">Svi korisnici i podrška</h3>
          <PeopleIcon style={{ color: '#19467c' }} />
        </span>
        <div className="table_container">
          <UsersTable query={query} data={usersList} selectedType={selectedType} setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage} />
        </div>
      </div>
    </div >
  );
};

export default AllClients;

import ClientsUsersTable from "../Tables/UsersTable";
import Toolbar from "../Toolbar/Toolbar";
import UserProfile from "../UserProfile/UserProfile";
import { useSelector } from "react-redux";
import { state } from "../../main";
import { useState } from "react";
import { useNavigate } from "react-router";
import InputAdornment from "@mui/material/InputAdornment";
import { OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { AdminFilterSelect } from "../Filters/AdminFilterSelect";
import PeopleIcon from '@mui/icons-material/People';
import FilterListIcon from '@mui/icons-material/FilterList';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText("#398b93"),
  backgroundColor: "#f9a235",
  "&:hover": {
    backgroundColor: "#19467c",
  },
}));

const AllClients = () => {
  const authState = useSelector((state: state) => state.auth);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  return (
    <div className="app_container">
      <Toolbar
        handleClickAccount={() => {
          if (authState["token"]) setShowUserProfile(true);
        }}
      />
      <UserProfile
        show={showUserProfile}
        onClose={() => setShowUserProfile(false)}
      />
      {/**ovde filter da odabere da li ce jendu ili drugu tabelu */}
      <div className="content_container">
        {/**
         * SEARCH NE MOZE FUNKCIONISATI DOK NE OMOGUCIM DA SE I QUERY I CLIENTS PROSLEDJUJE TABELI KROZ PROPS
         */}
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
              placeholder="Search"
              onChange={(e) => {
                setQuery(e.target.value.toLowerCase());
              }}
            />
            <AdminFilterSelect />
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
          {/**na osnovu filtera da li otvara klijents users ili support users */}
          <ClientsUsersTable />
        </div>
      </div>
    </div >
  );
};

export default AllClients;

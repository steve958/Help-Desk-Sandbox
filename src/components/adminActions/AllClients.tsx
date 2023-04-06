import ClientsUsersTable from "../Tables/ClientsUsersTable";
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
      <div className="content_container">
        {/**
         * SEARCH NE MOZE FUNKCIONISATI DOK NE OMOGUCIM DA SE I QUERY I CLIENTS PROSLEDJUJE TABELI KROZ PROPS
         */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "95%",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <OutlinedInput
            id="input-with-icon-adornment"
            style={{ width: "400px", fontFamily: "Times New Roman" }}
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
          <ColorButton
            onClick={() => {
              navigate("/newclient");
            }}
          >
            Add new client
          </ColorButton>
        </div>

        <h3 className="headings">Clients</h3>
        <div className="table_container">
          <ClientsUsersTable />
        </div>
      </div>
    </div>
  );
};

export default AllClients;

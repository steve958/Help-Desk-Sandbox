import Toolbar from "../Toolbar/Toolbar";
import UserProfile from "../UserProfile/UserProfile";
import { useSelector } from "react-redux";
import { state } from "../../main";
import { useState } from "react";
import { useNavigate } from "react-router";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import BusinessIcon from '@mui/icons-material/Business';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import CompaniesTable from "../Tables/CompaniesTable";


const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText("#398b93"),
  backgroundColor: "#f9a235",
  "&:hover": {
    backgroundColor: "#19467c",
  },
}));

function NewCompanyTextField() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { width: '400px', marginRight: '20px' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label='ime kompanije' variant="outlined" />
    </Box>
  );
}

const AllCompanies = () => {
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

        <span className="heading_icon_wrapper">
          <h3 className="headings">Dodaj novu kompaniju</h3>
          <DomainAddIcon style={{ color: '#19467c' }} />
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "95%",
            alignItems: "center",
          }}
        >
          <NewCompanyTextField />
          <ColorButton>
            Dodaj kompaniju
          </ColorButton>
        </div>
        <span className="heading_icon_wrapper">
          <h3 className="headings">Kompanije</h3>
          <BusinessIcon style={{ color: '#19467c' }} />
        </span>
        <div className="table_container">
          <CompaniesTable />
        </div>
      </div>
    </div >
  );
};

export default AllCompanies;

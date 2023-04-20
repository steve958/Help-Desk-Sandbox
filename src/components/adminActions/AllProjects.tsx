import Toolbar from "../Toolbar/Toolbar";
import UserProfile from "../UserProfile/UserProfile";
import { useSelector } from "react-redux";
import { state } from "../../main";
import { useState } from "react";
import { useNavigate } from "react-router";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ProjectsTable from "../Tables/ProjectsTable";


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
      <TextField id="outlined-basic" label='ime projekta' variant="outlined" />
    </Box>
  );
}

const AllProjects = () => {
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
          <h3 className="headings">Dodaj nov projekat</h3>
          <NoteAddIcon style={{ color: '#19467c' }} />
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
            Dodaj projekat
          </ColorButton>
        </div>
        <span className="heading_icon_wrapper">
          <h3 className="headings">Projekti</h3>
          <InsertDriveFileIcon style={{ color: '#19467c' }} />
        </span>
        <div className="table_container">
          <ProjectsTable />
        </div>
      </div>
    </div >
  );
};

export default AllProjects;

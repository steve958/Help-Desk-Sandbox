import Toolbar from "../Toolbar/Toolbar";
import UserProfile from "../UserProfile/UserProfile";
import { useEffect, useRef, useState } from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ProjectsTable from "../Tables/ProjectsTable";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useAppSelector } from "../../app/hooks";
import { Project } from "../../interfaces";
import { allProjectsCall, newProjectCall } from "../../helpers/apiCalls";

const AllProjects = () => {
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [projectsList, setProjectsList] = useState<Project[] | []>([])
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const projectNameRef = useRef('') as React.MutableRefObject<string> | any
  const token = useAppSelector(state => state.user.JWT)

  async function fetchAllProjects() {
    const list = await allProjectsCall(token)
    setProjectsList(list)
  }

  useEffect(() => {
    if (successMessage || errorMessage) {
      setTimeout(() => { setSuccessMessage(''); setErrorMessage('') }, 4000)
    }
    fetchAllProjects()
  }, [successMessage, errorMessage])

  useEffect(() => {
    console.log(projectsList);
  }, [projectsList])

  //MUI CONFIG
  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText("#398b93"),
    backgroundColor: "#f9a235",
    "&:hover": {
      backgroundColor: "#19467c",
    },
  }));

  function NewProjectTextField() {
    return (
      <Box
        component="form"
        sx={{
          '& > :not(style)': { width: '400px', marginRight: '20px' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label='ime projekta' variant="outlined" inputRef={projectNameRef} disabled={!!successMessage || !!errorMessage} />
      </Box>
    );
  }

  //handle project submit
  async function projectSubmit() {
    let projectName: string = projectNameRef.current.value
    if (!projectName) return
    else {
      try {
        const postProject = await newProjectCall(token, projectName)
        if (postProject) {
          setSuccessMessage('Uspešno kreiran projekat')
        } else {
          console.log(postProject);
          setErrorMessage('Došlo je do problema')
        }
      } catch (error: any) {
        console.error(error.message)
      }
      projectName = ''
    }
  }

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
          <span style={{ position: 'absolute', width: '300px', left: '40%', fontWeight: '600' }}>
            {successMessage &&
              <span style={{ display: 'flex', alignItems: 'center', color: '#19467c' }}>
                <p>{successMessage}</p>
                <CheckCircleOutlineIcon style={{ color: 'green' }} />
              </span>}
            {errorMessage &&
              <span style={{ display: "flex", alignItems: 'center', color: 'red' }}>
                <p>{errorMessage}</p>
                <ErrorOutlineIcon style={{ color: 'red' }} />
              </span>}
          </span>
          <NewProjectTextField />
          <ColorButton onClick={projectSubmit}>
            Dodaj projekat
          </ColorButton>
        </div>
        <span className="heading_icon_wrapper">
          <h3 className="headings">Projekti</h3>
          <InsertDriveFileIcon style={{ color: '#19467c' }} />
        </span>
        <div className="table_container">
          <ProjectsTable data={projectsList} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />
        </div>
      </div>
    </div >
  );
};

export default AllProjects;

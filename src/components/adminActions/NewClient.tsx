import { useEffect, useState } from 'react'
import Toolbar from '../Toolbar/Toolbar';
import { useSelector } from "react-redux";
import { state } from "../../main";
import './AdminActions.css'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';


const ColorButtonSubmit = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText('#398b93'),
  backgroundColor: '#f9a235',
  '&:hover': {
    backgroundColor: '#19467c',
  },
}));

const ColorButtonDiscard = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText('#398b93'),
  backgroundColor: '#19467c4a',
  '&:hover': {
    backgroundColor: '#19467c',
  },
}));

function ButtonDiscard() {
  return (<ColorButtonDiscard variant='contained'>Discard user</ColorButtonDiscard>)
}

function ButtonSubmit() {
  return (
    <ColorButtonSubmit variant="contained">Submit user</ColorButtonSubmit>
  );
}

function BasicSelect(props: any) {

  const { heading, value, setValue } = props
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 180 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{heading}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={heading}
          onChange={handleChange}
          sx={{ color: 'white' }}
        >
          <MenuItem value='client'>Client</MenuItem>
          <MenuItem value='client_admin'>Client_Admin</MenuItem>
          <MenuItem value='support'>Support</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

function ProjectsSelect(props: any) {

  const { heading, projectID, setProjectID } = props
  const handleChange = (event: SelectChangeEvent) => {
    setProjectID(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 180 }}>
      <FormControl fullWidth hiddenLabel>
        <InputLabel id="demo-simple-select-label">{heading}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={projectID}
          label={heading}
          onChange={handleChange}
          sx={{ color: 'white' }}
        >
          <MenuItem value='project 1'>Project 1</MenuItem>
          <MenuItem value='project 2'>Project 2</MenuItem>
          <MenuItem value='project 3'>Project 3</MenuItem>
          <MenuItem value='project 4'>Project 4</MenuItem>
          <MenuItem value='project 5'>Project 5</MenuItem>
          <MenuItem value='project 6'>Project 6</MenuItem>
          <MenuItem value='project 7'>Project 7</MenuItem>
          <MenuItem value='project 8'>Project 8</MenuItem>
          <MenuItem value='project 9'>Project 9</MenuItem>
          <MenuItem value='project 10'>Project 10</MenuItem>
          <MenuItem value='project 11'>Project 11</MenuItem>
          <MenuItem value='project 12'>Project 12</MenuItem>
          <MenuItem value='project 13'>Project 13</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}


function FirstNameTextField() {

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '180px' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label='firstname' variant="outlined" />
    </Box>
  );
}

function LastNameTextField() {

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '180px' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label='lastname' variant="outlined" />
    </Box>
  );
}

function EmailTextField() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '180px' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label='email' variant="outlined" />
    </Box>
  );
}

function PhoneTextField() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '180px' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label='phone' variant="outlined" />
    </Box>
  );
}

function UserNameTextField() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '180px' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label='username' variant="outlined" />
    </Box>
  );
}

const NewClient = () => {
  const authState = useSelector((state: state) => state.auth);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [value, setValue] = useState('client');
  const [projectsList, setProjectsList] = useState([]) as string[] | any
  const [projectID, setProjectID] = useState('');


  useEffect(() => {
    console.log(projectsList);
  }, [projectsList])

  function handleAddProject(value: string) {
    if (!projectsList.includes(value) && value !== '') {
      setProjectsList((oldList: string[]) => [...oldList, value])
      setProjectID('')
    }
    setProjectID('')
  }

  function handleDeleteProject(value: string) {
    setProjectsList((oldList: string[]) => [...oldList.filter((id) => id !== value)])
  }


  return <div className='new_client_container'>
    <Toolbar handleClickAccount={() => {
      if (authState["token"]) setShowUserProfile(true);
    }} />
    <div className='new_client_wrapper'>
      <div className='input_field_wrapper_type'>
        <p>Select user type:</p>
        <BasicSelect heading='type' value={value} setValue={setValue} />
      </div>
      {(value === 'support') && <div className='form_wrapper'>
        <div className='input_field_wrapper'>
          <p>Support's firstname:</p>
          <FirstNameTextField />
        </div>
        <div className='input_field_wrapper'>
          <p>Support's lastname:</p>
          <LastNameTextField />
        </div>
        <div className='input_field_wrapper'>
          <p>Support's email:</p>
          <EmailTextField />
        </div>
        <div className='input_field_wrapper'>
          <p>Support's phone number:</p>
          <PhoneTextField />
        </div>
        <div className='input_field_wrapper'>
          <p>Support's username:</p>
          <UserNameTextField />
        </div>
      </div>}
      {(value === 'client' || value === 'client_admin') && <div className='form_wrapper'>
        <div className='input_field_wrapper'>
          <p>Client's firstname:</p>
          <FirstNameTextField />
        </div>
        <div className='input_field_wrapper'>
          <p>Client's lastname:</p>
          <LastNameTextField />
        </div>
        <div className='input_field_wrapper'>
          <p>Client's email:</p>
          <EmailTextField />
        </div>
        <div className='input_field_wrapper'>
          <p>Client's phone number:</p>
          <PhoneTextField />
        </div>
        <div className='input_field_wrapper'>
          <p>Client's username:</p>
          <UserNameTextField />
        </div>
        <div className='input_field_wrapper_type'>
          <p>Select client's associated projects:</p>
          <ProjectsSelect heading='project' projectID={projectID} setProjectID={setProjectID} />
          <Tooltip title='ADD PROJECT TO A LIST'>
            <span onClick={() => handleAddProject(projectID)}>
              <AddIcon style={{ width: '40px', height: '40px' }} />
            </span>
          </Tooltip>
        </div>
        {projectsList.length > 0 &&
          (<div className='input_field_wrapper_projects'>
            <p>Client's projects:</p>
            {projectsList.map((id: string) => {
              return <Tooltip title='CLICK TO DELETE PROJECT FROM THE LIST'>
                <div className='project_field' onClick={() => handleDeleteProject(id)}>{id}</div>
              </Tooltip>
            }
            )}
          </div>)}
      </div>}
    </div>
    <span className='submint_buttons_wrapper'>
      <ButtonDiscard></ButtonDiscard>
      <ButtonSubmit></ButtonSubmit>
    </span>
  </div>;
};

export default NewClient;

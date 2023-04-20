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
  return (<ColorButtonDiscard variant='contained'>Zanemari</ColorButtonDiscard>)
}

function ButtonSubmit() {
  return (
    <ColorButtonSubmit variant="contained">Sačuvaj korisnika</ColorButtonSubmit>
  );
}

function BasicSelect(props: any) {

  const { heading, value, setValue } = props
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 150 }}>
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
          <MenuItem value='client'>Klijent</MenuItem>
          <MenuItem value='client_admin'>Klijent-Admin</MenuItem>
          <MenuItem value='support'>Podrška</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

function CompaniesSelect(props: any) {
  const [value, setValue] = useState('')
  const { heading } = props
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 150 }}>
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
          <MenuItem value='company 1'>Kompanija 1</MenuItem>
          <MenuItem value='company 2'>Kompanija 2</MenuItem>
          <MenuItem value='company 3'>Kompanija 3</MenuItem>
          <MenuItem value='company 4'>Kompanija 4</MenuItem>
          <MenuItem value='company 5'>Kompanija 5</MenuItem>
          <MenuItem value='company 6'>Kompanija 6</MenuItem>
          <MenuItem value='company 7'>Kompanija 7</MenuItem>
          <MenuItem value='company 8'>Kompanija 8</MenuItem>
          <MenuItem value='company 9'>Kompanija 9</MenuItem>
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
    <Box sx={{ minWidth: 150 }}>
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
          <MenuItem value='project 1'>Projekat 1</MenuItem>
          <MenuItem value='project 2'>Projekat 2</MenuItem>
          <MenuItem value='project 3'>Projekat 3</MenuItem>
          <MenuItem value='project 4'>Projekat 4</MenuItem>
          <MenuItem value='project 5'>Projekat 5</MenuItem>
          <MenuItem value='project 6'>Projekat 6</MenuItem>
          <MenuItem value='project 7'>Projekat 7</MenuItem>
          <MenuItem value='project 8'>Projekat 8</MenuItem>
          <MenuItem value='project 9'>Projekat 9</MenuItem>
          <MenuItem value='project 10'>Projekat 10</MenuItem>
          <MenuItem value='project 11'>Projekat 11</MenuItem>
          <MenuItem value='project 12'>Projekat 12</MenuItem>
          <MenuItem value='project 13'>Projekat 13</MenuItem>
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
      <TextField id="outlined-basic" label='ime' variant="outlined" />
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
      <TextField id="outlined-basic" label='prezime' variant="outlined" />
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
      <TextField id="outlined-basic" label='broj telefona' variant="outlined" />
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
      <TextField id="outlined-basic" label='korisničko ime' variant="outlined" />
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
        <p>Tip korisnika:</p>
        <BasicSelect heading='type' value={value} setValue={setValue} />
      </div>
      <div className='form_wrapper'>
        <div className='input_field_wrapper'>
          <p>Ime korisnika:</p>
          <FirstNameTextField />
        </div>
        <div className='input_field_wrapper'>
          <p>Prezime korisnika:</p>
          <LastNameTextField />
        </div>
        <div className='input_field_wrapper'>
          <p>E-mail korisnika:</p>
          <EmailTextField />
        </div>
        <div className='input_field_wrapper'>
          <p>Broj telefona korisnika:</p>
          <PhoneTextField />
        </div>
        <div className='input_field_wrapper'>
          <p>Jedinstveno korisničko ime:</p>
          <UserNameTextField />
        </div>
      </div>
      {(value === 'client' || value === 'client_admin') && <div className='form_wrapper'>
        <div className='input_field_wrapper_type'>
          <p>Izabrati korisnikovu vezu sa kompanijama i projektima:</p>
          <CompaniesSelect heading='company' />
          <ProjectsSelect heading='project' projectID={projectID} setProjectID={setProjectID} />
          <Tooltip title='ADD PROJECT TO A LIST'>
            <span onClick={() => handleAddProject(projectID)}>
              <AddIcon style={{ width: '40px', height: '40px' }} />
            </span>
          </Tooltip>
        </div>
        {projectsList.length > 0 &&
          (<div className='input_field_wrapper_projects'>
            <p>Korisnikovi projekti:</p>
            {projectsList.map((id: string) => {
              return <Tooltip title='KLIKNI DA OBRIŠEŠ PROJEKAT SA LISTE'>
                <div className='project_field' onClick={() => handleDeleteProject(id)}>{id}</div>
              </Tooltip>
            }
            )}
          </div>)}
      </div>}
    </div>
    <span className='submit_buttons_wrapper'>
      <ButtonDiscard></ButtonDiscard>
      <ButtonSubmit></ButtonSubmit>
    </span>
  </div>;
};

export default NewClient;

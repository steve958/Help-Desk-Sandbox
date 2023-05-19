import React, { useEffect, useState, useRef } from "react";
import './NewTicket.css'
import { useNavigate } from "react-router";
//CUSTOM COMPONENTS
import Toolbar from "../Toolbar/Toolbar";
import UserProfile from "../UserProfile/UserProfile";
import { RootState } from "../../app/store";
//LOCAL HELPERS
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CompanyProjectUser } from "../../interfaces";
import { createNewMessageCall, createNewTicketCall } from "../../helpers/apiCalls";
//MUI COMPONENTS AND TYPES
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import TextField from '@mui/material/TextField';
//MUI ICONS
import InfoIcon from '@mui/icons-material/Info';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CreateIcon from '@mui/icons-material/Create';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { setSelectedTicket } from "../../features/user/userSlice";

const NewTicket = () => {
  const token = useAppSelector((state: RootState) => state.user.JWT)
  const connectionList = useAppSelector((state: RootState) => state.user.userConnections)
  const navigate = useNavigate()
  const messageRef = useRef<any>('')
  const titleRef = useRef<any>('')
  const dispatch = useAppDispatch()

  const [showUserProfile, setShowUserProfile] = useState<boolean>(false);
  const [selectedConnection, setSelectedConnection] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    if (successMessage || errorMessage) {
      setTimeout(() => { setSuccessMessage(''); setErrorMessage('') }, 4000)
    }
  }, [successMessage, errorMessage])

  //MUI CONFIG
  const ColorButtonSubmit = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText('#398b93'),
    backgroundColor: '#f9a235',
    width: '200px',
    marginRight: '50px',
    '&:hover': {
      backgroundColor: '#19467c',
    },
  }));

  const ColorButtonDiscard = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText('#398b93'),
    backgroundColor: '#19467c7a',
    width: '200px',
    '&:hover': {
      backgroundColor: '#19467c',
    },
  }));

  function ButtonDiscard() {
    return (<ColorButtonDiscard variant='contained' onClick={() => navigate("/clientdashboard")}>Zanemari</ColorButtonDiscard>)
  }

  function ButtonSubmit() {
    return (
      <ColorButtonSubmit variant="contained" onClick={() => handleCreateTicket()}>Kreiraj tiket</ColorButtonSubmit>
    );
  }

  function BasicTextFields() {
    return (
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '500px' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="naslov" variant="outlined" inputRef={titleRef} />
      </Box>
    );
  }

  function BasicSelect(props: any) {
    const { heading, selectedConnection, setSelectedConnection } = props
    const handleChange = (event: SelectChangeEvent) => {
      setSelectedConnection(event.target.value as string);
    };

    return (
      <Box sx={{ minWidth: 250 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{heading}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedConnection}
            label={heading}
            onChange={handleChange}
          >{connectionList.map((connection: CompanyProjectUser) => {
            return <MenuItem value={connection.companyProjectUserId} key={connection.companyProjectUserId}>{connection.companyProjectUserName.slice(0, connection.companyProjectUserName.lastIndexOf('-'))}</MenuItem>
          })}
          </Select>
        </FormControl>
      </Box>
    );
  }


  //handle create ticket 
  async function handleCreateTicket() {
    let message = messageRef.current.value
    let title = titleRef.current.value
    if (!message || !title) {
      setErrorMessage('Povezani projekat, naslov i opis tiketa su obavezna polja')
      return
    } else {
      const response = await createNewTicketCall(token, title, selectedConnection)
      if (response) {
        setSuccessMessage('Uspešno kreiran tiket')
        dispatch(setSelectedTicket(response))
        const messageResponse = await createNewMessageCall(token, response.ticketId, message)
        if (messageResponse) {
          navigate(`/ticket/${response.ticketId}`)
        } else {
          setErrorMessage('Došlo je do greške pri kreiranju poruke')
        }
      } else {
        setErrorMessage('Došlo je do greške pri kreiranju tiketa')
      }
    }
    message = ''
    title = ''
  }

  return <div className="new_ticket_container">
    <Toolbar
      handleClickAccount={() => {
        if (token) setShowUserProfile(true);
      }} />
    <UserProfile
      show={showUserProfile}
      onClose={() => setShowUserProfile(false)}
    />
    {errorMessage &&
      <span style={{ position: 'absolute', top: '110px', display: "flex", alignItems: 'center', color: 'red', fontWeight: '600' }}>
        <ErrorOutlineIcon style={{ color: 'red', marginRight: '6px' }} />
        <p>{errorMessage}</p>
      </span>}
    <span className='heading_icon_wrapper'>
      <h3 className="headings">Detalji tiketa</h3>
      <InfoIcon style={{ color: '#19467c' }} />
    </span>
    <div className="select_details_wrapper">
      <span>
        <p>Izaberi povezani projekat:</p>
        <BasicSelect heading='projekat' selectedConnection={selectedConnection} setSelectedConnection={setSelectedConnection}>Kompanija</BasicSelect>
      </span>
      <span style={{ width: '50%' }}>
        <p>Naslov tiketa:</p>
        <BasicTextFields />
      </span>
    </div>
    <span className="heading_icon_wrapper">
      <h3 className="headings">Opis tiketa</h3>
      <CreateIcon style={{ color: '#19467c' }} />
    </span>
    <div className="description_wrapper">
      <textarea className="description_field" ref={messageRef} />
    </div>
    <span className="heading_icon_wrapper">
      <h3 className="headings">Priloži dokument ili sliku ekrana</h3>
      <AttachFileIcon style={{ color: '#19467c' }} />
    </span>
    <div className="add_files_wrapper">
      <input type="file" className="add_files_field" multiple />
    </div>
    <div className="submit_wrapper">
      <span>
        <ButtonSubmit />
        <ButtonDiscard />
      </span>
    </div>
  </div>;
};

export default NewTicket;

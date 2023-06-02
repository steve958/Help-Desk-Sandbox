import React, { useEffect, useState, useRef } from "react";
import './NewTicket.css'
import { useNavigate } from "react-router";
import FormData from 'form-data';
import { Client } from '@microsoft/microsoft-graph-client';
//CUSTOM COMPONENTS
import Toolbar from "../Toolbar/Toolbar";
import UserProfile from "../UserProfile/UserProfile";
import { RootState } from "../../app/store";
//LOCAL HELPERS
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CompanyProjectUser } from "../../interfaces";
import { createNewMessageCall, createNewTicketCall } from "../../helpers/apiCalls";
import { setSelectedTicket } from "../../features/user/userSlice";
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
import { OutlinedInput } from "@mui/material";
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';


const NewTicket = () => {
  const token = useAppSelector((state: RootState) => state.user.JWT)
  const connectionList = useAppSelector((state: RootState) => state.user.userConnections)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [showUserProfile, setShowUserProfile] = useState<boolean>(false);
  const [selectedConnection, setSelectedConnection] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [validateConnection, setValidateConnection] = useState<boolean>(false)
  const [validateTitle, setValidateTitle] = useState<boolean>(false)
  const [validateMessage, setValidateMessage] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [formatBold, setFormatBold] = useState<boolean>(false)
  const [formatItalic, setFormatItalic] = useState<boolean>(false)
  const [formatUnderline, setFormatUnderline] = useState<boolean>(false)

  useEffect(() => {
    if (message) {
      setValidateMessage(false)
    }
    if (title) {
      setValidateTitle(false)
    }
    if (selectedConnection) {
      setValidateConnection(false)
    }
  }, [message, title, selectedConnection])

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
    return (<ColorButtonDiscard variant='contained' onClick={() => navigate("/clientdashboard")}>Odustani</ColorButtonDiscard>)
  }

  function ButtonSubmit() {
    return (
      <ColorButtonSubmit variant="contained" onClick={() => handleCreateTicket()}>Kreiraj tiket</ColorButtonSubmit>
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
            id={validateConnection ? 'warning' : ''}
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

  //upload logic
  const uploadFileToOneDrive = async (file: any) => {
    const accessToken = '5dd388dc-b510-47c3-9a15-160348ecde67'
    const client = Client.init({
      authProvider: (done) => {
        done(null, accessToken); // Provide the access token obtained previously
      }
    });

    const formData = new FormData();
    formData.append('file', file);

    try {
      await client
        .api('/me/drive/root/children')
        .put(formData);
      console.log('File uploaded successfully.');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  //handle create ticket 
  async function handleCreateTicket() {
    if (!message || !title || !selectedConnection) {
      if (!selectedConnection) {
        setErrorMessage('Povezani projekat je obavezno polje')
        setValidateConnection(true)
        return
      }
      if (!title) {
        setErrorMessage('Naslov tiketa je obevezno polje')
        setValidateTitle(true)
        return
      }
      if (!message) {
        setErrorMessage('Opis tiketa je obavezno polje')
        setValidateMessage(true)
        return
      }
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
        <FormControl>
          <InputLabel htmlFor='display-name'>naslov</InputLabel>
          <OutlinedInput
            id={validateTitle ? 'warning' : ''}
            label='naslov'
            type="text"
            placeholder="Pretraži po korisnikovom imenu"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
      </span>
    </div>
    <span className="heading_icon_wrapper">
      <h3 className="headings">Opis tiketa</h3>
      <CreateIcon style={{ color: '#19467c' }} />
    </span>
    <div className="description_wrapper">
      <span className='format_text_wrapper' style={{ marginTop: '0', color: '#19467c' }}>
        <span className='format_text_icon' id={formatBold ? 'active' : ''} onClick={() => formatBold ? setFormatBold(false) : setFormatBold(true)} style={{ marginLeft: '0' }}>
          <FormatBoldIcon />
        </span>
        <span className='format_text_icon' id={formatItalic ? 'active' : ''} onClick={() => formatItalic ? setFormatItalic(false) : setFormatItalic(true)}>
          <FormatItalicIcon />
        </span>
        <span className='format_text_icon' id={formatUnderline ? 'active' : ''} onClick={() => formatUnderline ? setFormatUnderline(false) : setFormatUnderline(true)}>
          <FormatUnderlinedIcon />
        </span>
      </span>
      <textarea className="description_field" style={{ fontWeight: formatBold ? '600' : '400', textDecoration: formatUnderline ? 'underline' : 'none', fontStyle: formatItalic ? 'italic' : 'normal' }} id={validateMessage ? 'warning' : ''} defaultValue={message} onChange={(e: any) => setMessage(e.target.value)} />
    </div>
    <span className="heading_icon_wrapper">
      <h3 className="headings">Priloži dokument ili sliku ekrana</h3>
      <AttachFileIcon style={{ color: '#19467c' }} />
    </span>
    <div className="add_files_wrapper">
      <input type="file" className="add_files_field" multiple onChange={(e: any) => uploadFileToOneDrive(e.target.files)} />
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

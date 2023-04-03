import React, { useState } from "react";
import './NewTicket.css'
import { useSelector } from "react-redux";
import { state } from "../../main";
import Toolbar from "../Toolbar/Toolbar";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const NewTicket = () => {
  const authState = useSelector((state: state) => state.auth);
  const [showUserProfile, setShowUserProfile] = useState(false);

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
    return (<ColorButtonDiscard variant='contained'>Discard ticket</ColorButtonDiscard>)
  }

  function ButtonSubmit() {
    return (
      <ColorButtonSubmit variant="contained">Submit ticket</ColorButtonSubmit>
    );
  }

  function BasicTextFields() {
    return (
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '180px' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="title" variant="outlined" />
      </Box>
    );
  }

  function BasicSelect(props: any) {
    const [value, setValue] = useState('');

    const { heading } = props
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
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  }

  return <div className="new_ticket_container">
    <Toolbar
      handleClickAccount={() => {
        if (authState["token"]) setShowUserProfile(true);
      }} />
    <h3 className="headings">Ticket details</h3>
    <div className="select_details_wrapper">
      <span>
        <p>Select company:</p>
        <BasicSelect heading='company'>Company</BasicSelect>
      </span>
      <span>
        <p>Select project:</p>
        <BasicSelect heading='project'>Project</BasicSelect>
      </span>
      <span>
        <p>Ticket title:</p>
        <BasicTextFields />
      </span>
    </div>
    <h3 className="headings">Ticket description</h3>
    <div className="description_wrapper">
      <textarea className="description_field" />
    </div>
    <h3 className="headings">Add screenshots and other files</h3>
    <div className="add_files_wrapper">
      <input type="file" className="add_files_field" multiple />
    </div>
    <div className="submit_wrapper">
      <span>
        <ButtonDiscard />
        <ButtonSubmit />
      </span>
    </div>
  </div>;
};

export default NewTicket;

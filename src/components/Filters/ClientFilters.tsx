import react, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './AllFilters.css'
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';


const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText('#398b93'),
    backgroundColor: '#f9a235',
    '&:hover': {
        backgroundColor: '#19467c',
    },
}));

function ButtonSubmit() {
    return (
        <ColorButton variant="contained">Submit filters</ColorButton>
    );
}

function BasicSelect(props: any) {
    const [value, setValue] = useState('all');

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
                    <MenuItem value='all'>All</MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export default function ClientFilters() {
    return <div className='filter_wrapper'>
        <BasicSelect heading='company'></BasicSelect>
        <BasicSelect heading='project'></BasicSelect>
        <BasicSelect heading='status'></BasicSelect>
        <span className='calendars_wrapper'>
            <p>Filter tickets from</p>
            <input type="date" />
            <p>to</p>
            <input type="date" />
            <ButtonSubmit />
        </span>
    </div>
}
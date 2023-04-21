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
        <ColorButton variant="contained">Primeni filtere</ColorButton>
    );
}

function BasicSelect(props: any) {
    const [age, setAge] = useState('all');

    const { heading } = props
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 180 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{heading}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
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

export default function SupportFilters() {
    return <div className='filter_wrapper'>
        <span className='column_filters'>
            <span>
                <BasicSelect heading='kompanija'></BasicSelect>
                <BasicSelect heading='projekat'></BasicSelect>
                <BasicSelect heading='status'></BasicSelect>
            </span>
            <span>
                <BasicSelect heading='korisnik'></BasicSelect>
                <BasicSelect heading='prioritet'></BasicSelect>
                <BasicSelect heading='tip'></BasicSelect>
            </span>
        </span>
        <span className='calendars_wrapper'>
            <span style={{ width: '20%' }}>
                <p>Filtriraj tikete</p>
            </span>
            <span className='calendars_field'>
                <span>
                    <p>od</p>
                    <input type="datetime-local" />
                </span>
                <span>
                    <p>do</p>
                    <input type="datetime-local" />
                </span>
            </span>
            <span className='filters_button_field'>
                <ButtonSubmit />
            </span>
        </span>
    </div>
}
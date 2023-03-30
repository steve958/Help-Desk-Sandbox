import react, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './AllFilters.css'


function BasicSelect(props: any) {
    const [age, setAge] = useState('');

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
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export default function ClientFilters() {
    return <div className='filter-wrapper'>
        <BasicSelect heading='company'></BasicSelect>
        <BasicSelect heading='project'></BasicSelect>
        <BasicSelect heading='status'></BasicSelect>
    </div>
}
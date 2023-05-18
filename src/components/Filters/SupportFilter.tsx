import react, { useState } from 'react';
import './AllFilters.css'
//LOCAL HELPERS
import { RootState } from '../../app/store';
import { useAppSelector } from '../../app/hooks';
//MUI COMPONENTS AND TYPES
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Company, Project, TicketPriority, TicketStatus, TicketType } from '../../interfaces';
import { InputAdornment, OutlinedInput } from '@mui/material';
//MUI ICONS
import SearchIcon from "@mui/icons-material/Search";


interface SupportFiltersProps {
    selectedCompany: string
    selectedProject: string
    selectedStatus: string
    selectedPriority: string
    selectedType: string
    setSelectedCompany: React.Dispatch<React.SetStateAction<string>>
    setSelectedProject: React.Dispatch<React.SetStateAction<string>>
    setSelectedStatus: React.Dispatch<React.SetStateAction<string>>
    setSelectedPriority: React.Dispatch<React.SetStateAction<string>>
    setSelectedType: React.Dispatch<React.SetStateAction<string>>
    setTimeTableFrom: React.Dispatch<React.SetStateAction<any>>
    setTimeTableTo: React.Dispatch<React.SetStateAction<any>>
    query: string
    setQuery: React.Dispatch<React.SetStateAction<string>>
}

export default function SupportFilters(props: SupportFiltersProps) {

    const { selectedCompany, selectedProject, selectedPriority,
        selectedStatus, selectedType, query, setSelectedCompany,
        setSelectedProject, setSelectedPriority, setSelectedStatus,
        setSelectedType, setTimeTableFrom, setTimeTableTo, setQuery
    } = props

    const companies = useAppSelector((state: RootState) => state.filter.allCompanies)
    const projects = useAppSelector((state: RootState) => state.filter.allProjects)
    const statuses = useAppSelector((state: RootState) => state.filter.ticketStatuses)
    const priorities = useAppSelector((state: RootState) => state.filter.ticketPriorities)
    const types = useAppSelector((state: RootState) => state.filter.ticketTypes)

    //MUI CONFIG
    function CompanySelect(props: any) {

        const { heading } = props
        const handleChange = (event: SelectChangeEvent) => {
            setSelectedCompany(event.target.value as string);
        };

        return (
            <Box sx={{ minWidth: 300 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{heading}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={selectedCompany}
                        label={heading}
                        onChange={handleChange}
                    >
                        <MenuItem value='Sve'>Sve</MenuItem>
                        {companies.map((company: Company) => {
                            return <MenuItem key={company.companyId} value={company.companyName}>{company.companyName}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Box>
        );
    }

    function ProjectSelect(props: any) {

        const { heading } = props
        const handleChange = (event: SelectChangeEvent) => {
            setSelectedProject(event.target.value as string);
        };

        return (
            <Box sx={{ minWidth: 300 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{heading}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={selectedProject}
                        label={heading}
                        onChange={handleChange}
                    >
                        <MenuItem value='Svi'>Svi</MenuItem>
                        {projects.map((project: Project) => {
                            return <MenuItem key={project.projectId} value={project.projectName}>{project.projectName}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Box>
        );
    }

    function StatusSelect(props: any) {

        const { heading } = props
        const handleChange = (event: SelectChangeEvent) => {
            setSelectedStatus(event.target.value as string);
        };

        return (
            <Box sx={{ minWidth: 300 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{heading}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={selectedStatus}
                        label={heading}
                        onChange={handleChange}
                    >
                        <MenuItem value='Svi'>Svi</MenuItem>
                        {statuses.map((status: TicketStatus) => {
                            return <MenuItem key={status.ticketStatusId} value={status.ticketStatusId}>{status.ticketStatusName}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Box>
        );
    }

    function PrioritiesSelect(props: any) {

        const { heading } = props
        const handleChange = (event: SelectChangeEvent) => {
            setSelectedPriority(event.target.value as string);
        };

        return (
            <Box sx={{ minWidth: 300 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{heading}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={selectedPriority}
                        label={heading}
                        onChange={handleChange}
                    >
                        <MenuItem value='Svi'>Svi</MenuItem>
                        {priorities.map((priority: TicketPriority) => {
                            return <MenuItem key={priority.ticketPriorityId} value={priority.ticketPriorityId}>{priority.ticketPriorityName}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Box>
        );
    }

    function TypeSelect(props: any) {

        const { heading } = props
        const handleChange = (event: SelectChangeEvent) => {
            setSelectedType(event.target.value as string);
        };

        return (
            <Box sx={{ minWidth: 300 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{heading}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={selectedType}
                        label={heading}
                        onChange={handleChange}
                    >
                        <MenuItem value='Svi'>Svi</MenuItem>
                        {types.map((type: TicketType) => {
                            return <MenuItem key={type.ticketTypeId} value={type.ticketTypeId}>{type.ticketTypeName}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Box>
        );
    }

    return <div className='filter_wrapper'>
        <span className='column_filters'>
            <span>
                <CompanySelect heading='kompanija'></CompanySelect>
                <ProjectSelect heading='projekat'></ProjectSelect>
                <StatusSelect heading='status'></StatusSelect>
            </span>
            <span>
                <FormControl>
                    <InputLabel htmlFor='display-name'>korisnikovo ime</InputLabel>
                    <OutlinedInput
                        style={{
                            width: "300px", fontFamily: 'Arial', paddingLeft: '10px', height: '60px'
                        }}
                        startAdornment={
                            <InputAdornment position="end">
                                <SearchIcon style={{ marginRight: '10px' }} />
                            </InputAdornment>
                        }
                        label='korisnikovo ime'
                        type="text"
                        placeholder="Pretraži po korisnikovom imenu"
                        defaultValue={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </FormControl>
                <PrioritiesSelect heading='prioritet'></PrioritiesSelect>
                <TypeSelect heading='tip'></TypeSelect>
            </span>
        </span>
        <span className='calendars_wrapper'>
            <span style={{ marginLeft: '0' }}>
                <p>Filtriraj tikete</p>
            </span>
            <span className='calendars_field' style={{ display: 'flex' }}>
                <span>
                    <p>od</p>
                    <input type="datetime-local" onChange={(e) => setTimeTableFrom(e.target.value)} />
                </span>
                <span>
                    <p>do</p>
                    <input type="datetime-local" onChange={(e) => setTimeTableTo(e.target.value)} />
                </span>
            </span>
        </span>
    </div >
}
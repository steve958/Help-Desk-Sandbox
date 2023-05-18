import react, { useState, useEffect } from "react";
import "./AllFilters.css";
//LOCAL HELPERS
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { CompanyProjectUser, TicketStatus } from "../../interfaces";
//MUI COMPONENTS AND TYPES
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";


interface ClientFiltersProps {
  setSelectedConnection: React.Dispatch<React.SetStateAction<string>>
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>
  selectedConnection: string
  selectedStatus: string
  setTimeTableFrom: React.Dispatch<React.SetStateAction<any>>
  setTimeTableTo: React.Dispatch<React.SetStateAction<any>>
}

export default function ClientFilters(props: ClientFiltersProps) {
  const {
    setSelectedConnection,
    setSelectedStatus,
    selectedStatus,
    selectedConnection,
    setTimeTableTo,
    setTimeTableFrom,
  } = props

  //MUI CONFIG
  function Connections(props: any) {
    const { heading } = props
    const connections = useAppSelector((state: RootState) => state.user.userConnections)

    const handleChange = (event: SelectChangeEvent) => {
      setSelectedConnection(event.target.value);
    };

    return (
      <Box sx={{ minWidth: 250 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{heading}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={heading}
            onChange={handleChange}
            defaultValue={selectedConnection}
          >
            <MenuItem value='Svi'>Svi</MenuItem>
            {connections.map((connection: CompanyProjectUser) => {
              return <MenuItem key={connection.companyProjectUserId} value={connection.companyProjectUserId}>{connection.companyProjectUserName.slice(0, connection.companyProjectUserName.lastIndexOf('-'))}</MenuItem>
            })}
          </Select>
        </FormControl>
      </Box>
    );
  }

  function Statuses(props: any) {
    const { heading } = props
    const statuses = useAppSelector((state: RootState) => state.filter.ticketStatuses)

    const handleChange = (event: SelectChangeEvent) => {
      setSelectedStatus(event.target.value as string);
    };

    return (
      <Box sx={{ minWidth: 250 }}>
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
              return <MenuItem key={status.ticketStatusId} value={status.ticketStatusName}>{status.ticketStatusName}</MenuItem>
            })}
          </Select>
        </FormControl>
      </Box>
    );
  }

  return (
    <div className="filter_wrapper" style={{ width: '100%' }}>
      <span style={{ display: 'flex', width: '30%', justifyContent: 'space-between' }}>
        <Connections heading="projekat" setSelectedConnection={setSelectedConnection} selectedConnection={selectedConnection}></Connections>
        <Statuses heading="status" setSelectedStatus={setSelectedStatus} selectedStatus={selectedStatus}></Statuses>
      </span>
      <span className='calendars_wrapper' style={{ width: '70%' }}>
        <span className='calendars_field' style={{ width: '100%' }}>
          <p style={{ marginRight: '10px', marginLeft: '10px' }}>Filtriraj tikete od</p>
          <input type="datetime-local" onChange={(e) => setTimeTableFrom(e.target.value)} />
          <p style={{ marginRight: '10px', marginLeft: '10px' }}>do</p>
          <input type="datetime-local" onChange={(e) => setTimeTableTo(e.target.value)} />
        </span>
      </span>
    </div>
  );
}

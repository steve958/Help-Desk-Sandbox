import react, { useState } from "react";
import "./AllFilters.css";
//LOCAL HELPERS
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { UserTypes } from "../../interfaces";
//MUI COMPONENTS AND TYPES
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function BasicSelect(props: any) {
  const { selectedType, setSelectedType, heading } = props
  const types = useAppSelector((state: RootState) => state.filter.userTypes)
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedType(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 180 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{heading}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={heading}
          onChange={handleChange}
          defaultValue='Svi'
        >
          <MenuItem value='Svi'>Svi</MenuItem>
          {types.map((type: UserTypes) => {
            return <MenuItem value={type.userTypeName} key={type.userTypeId}>{type.userTypeName}</MenuItem>
          }
          )}
        </Select>
      </FormControl>
    </Box>
  );
}

interface AdminFilterSelectProps {
  selectedType: string
  setSelectedType: React.Dispatch<React.SetStateAction<string>>
}

export const AdminFilterSelect = (props: AdminFilterSelectProps) => {
  return <BasicSelect heading="tip" setSelectedType={props.setSelectedType} selectedType={props.selectedType} />;
};

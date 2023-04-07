import react, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./AllFilters.css";

function BasicSelect(props: any) {
  const [value, setValue] = useState("all");

  const { heading } = props;
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
          <MenuItem value="Clients">Clients</MenuItem>
          <MenuItem value={"Support"}>Support</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export const AdminFilterSelect = () => {
  return <BasicSelect heading="User type" />;
};

import {
  Button,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ParamBuilder } from "../../utils/ParamBuilder";
import "./FilterForm.css";

export const FilterForm = (props: any) => {
  const statuses = ["unknown", "Alive", "Dead"];
  const genders = ["unknown", "Male", "Female"];

  const [inputSearch, setInputSearch] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");

  const pBuilder = new ParamBuilder();

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  const handleChangeGender = (event: SelectChangeEvent) => {
    setGender(event.target.value);
  };

  const handleChangeSearch = (event: any) => {
    setInputSearch(event.target.value);
  };

  const handleClick = () => {
    if (inputSearch.length > 0) {
      pBuilder.addParam("name", inputSearch);
    }
    if (status.length > 0) {
      pBuilder.addParam("status", status);
    }
    if (gender.length > 0) {
      pBuilder.addParam("gender", gender);
    }

    var builtParams = pBuilder.build();
    props.paramsHandler(1, builtParams);
    props.drawerToggle();
  };

  const clearFilters = () => {
    setInputSearch("");
    setStatus("");
    setGender("");
    props.clearHandler();
  };

  useEffect(() => {}, [props]);

  return (
    <div>
      <Typography
        textAlign="start"
        variant="h6"
        style={{ marginBottom: "40px" }}
      >
        Filters
      </Typography>
      <Stack
        spacing={2}
        divider={<Divider orientation="horizontal" flexItem />}
        style={{ width: "90%" }}
        textAlign="start"
      >
        <TextField
          id="outlined-name"
          label="Search"
          value={inputSearch}
          onChange={handleChangeSearch}
        />
        <FormControl fullWidth>
          <InputLabel id="select-status-lbl">Status</InputLabel>
          <Select
            labelId="select-status-lbl"
            id="select-status"
            value={status}
            label="Statuses"
            onChange={handleChangeStatus}
          >
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="select-gender-lbl">Gender</InputLabel>
          <Select
            labelId="select-gender-lbl"
            id="select-gender"
            value={gender}
            label="Genders"
            onChange={handleChangeGender}
          >
            {genders.map((gender) => (
              <MenuItem key={gender} value={gender}>
                {gender}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Container
          style={{ display: "flex", gap: "15px", justifyContent: "center" }}
        >
          <Button variant="outlined" color="primary" onClick={clearFilters}>
            Clear
          </Button>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Search
          </Button>
        </Container>
      </Stack>
    </div>
  );
};

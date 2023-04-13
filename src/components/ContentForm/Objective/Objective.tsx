import React from "react";
import { Grid, TextField, Button, Box } from "@mui/material";
import "./Objective.css";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { styled } from "@mui/material/styles";
import MyCalendarIcon from "./MyCalendarIcon";
import dayjs from "dayjs";
import { KeyMeasure, KeyMeasures } from "./KeyMeasures/KeyMeasures";
import { useObjectiveHelper } from "./objective.helper";
import { useSelector } from "react-redux";

export interface ObjectiveItem {
  index: number;
  name: string;
  startDate: string;
  endDate: string;
  keyMeasures: KeyMeasure[];
}

interface ObjectiveProps {
  objective: ObjectiveItem;
}

// move open picker icon of MUI Datepicker to the left of the calendar.
const StyledDatePicker = styled(DesktopDatePicker)(() => ({
  "& .MuiInputBase-root": {
    "& .MuiInputAdornment-root": {
      position: "absolute",
    },
    "& .MuiInputBase-input": {
      paddingLeft: "50px",
    },
  },
}));

export const Objective = ({ objective }: ObjectiveProps) => {
  const { handleRemoveObjective, handleUpdateObjective } = useObjectiveHelper();
  const objectives = useSelector(
    (state: any) => state.objectives.objectiveList
  );
  const setStartDate = (date: any) => {
    handleUpdateObjective({
      updatedItem: {
        ...objective,
        startDate: dayjs(date as Date).format("DD/MM/YYYY"),
      },
    });
  };

  const setEndDate = (date: any) => {
    handleUpdateObjective({
      updatedItem: {
        ...objective,
        endDate: dayjs(date as Date).format("DD/MM/YYYY"),
      },
    });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (
      !objective.startDate ||
      !objective.endDate ||
      objective.keyMeasures.length === 0
    ) {
      alert("please inputs all the field and add at least one key measure.");
      return;
    }

    if (objective.startDate === objective.endDate) {
      alert("The end date should always be after the start date");
      return;
    }
    localStorage.setItem("objectives", JSON.stringify(objectives));
    alert("Update successfully");
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Grid container spacing={3}>
          <Grid
            sx={{ display: "flex", flexDirection: "column" }}
            item
            sm={12}
            md={6}
          >
            <span className="objective-label">Objective {objective.index}</span>
            <TextField
              className="inputs"
              required
              value={objective.name}
              onChange={(e) =>
                handleUpdateObjective({
                  updatedItem: { ...objective, name: e.target.value },
                })
              }
              name="name"
            />
          </Grid>

          <Grid
            sx={{ display: "flex", flexDirection: "column" }}
            item
            sm={12}
            md={3}
          >
            <text className="objective-label">Start Date</text>
            <StyledDatePicker
              slots={{
                openPickerIcon: () => <MyCalendarIcon />,
              }}
              format="DD/MM/YYYY"
              disablePast
              onChange={(date) => setStartDate(date)}
            />
          </Grid>

          <Grid
            sx={{ display: "flex", flexDirection: "column" }}
            item
            sm={12}
            md={3}
          >
            <text className="objective-label">End Date</text>

            <StyledDatePicker
              slots={{
                openPickerIcon: () => <MyCalendarIcon />,
              }}
              format="DD/MM/YYYY"
              disablePast
              onChange={(date) => setEndDate(date)}
            />
          </Grid>

          <Grid
            sx={{ display: "flex", flexDirection: "column" }}
            item
            sm={12}
            md={12}
            container
          >
            <KeyMeasures objective={objective} />
          </Grid>
        </Grid>

        <Box display="flex" marginTop={2} flexDirection="row-reverse" gap={2}>
          <Button
            sx={{
              background: "#25397D",
              height: "43px",
              textTransform: "none",
              width: "92px",
            }}
            type="submit"
            variant="contained"
            size="small"
          >
            Update
          </Button>
          <Button
            variant="outlined"
            sx={{ height: "43px", textTransform: "none", width: "92px" }}
            color="error"
            size="small"
            onClick={() => {
              handleRemoveObjective({ selectedIndex: objective.index });
            }}
          >
            Delete
          </Button>
        </Box>
      </form>
    </LocalizationProvider>
  );
};

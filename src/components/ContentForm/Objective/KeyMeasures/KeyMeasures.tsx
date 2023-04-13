import React from "react";
import "./KeyMeasures.css";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useObjectiveHelper } from "../objective.helper";
import { ObjectiveItem } from "../Objective";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export interface KeyMeasure {
  index: number;
  name: string;
}
interface KeyMeasuresProps {
  objective: ObjectiveItem;
}
export const KeyMeasures = ({ objective }: KeyMeasuresProps) => {
  const { keyMeasures } = objective;
  const { addKeyMeasure, removeKeyMeasure, updateKeyMeasure } =
    useObjectiveHelper();

  const handleChange = (value: string, item: KeyMeasure) => {
    updateKeyMeasure(objective.index, { index: item.index, name: value });
  };

  const handleAddKeyMeasure = () => {
    if (objective.keyMeasures.length >= 3) {
      alert("You only have 3 key measures.");
      return;
    }
    addKeyMeasure(objective.index);
  };

  return (
    <div className="measures-container">
      <div style={{ display: "flex" }}>
        <Grid item xs={12} md={6} paddingRight={0.5}>
          <span>Key Measures</span>
          <span className="small-text">
            Add additional key measures{" "}
            <AddCircleIcon
              fontSize="small"
              sx={{ verticalAlign: "-6px", color: "#25397d" }}
              onClick={() => handleAddKeyMeasure()}
            />
          </span>
        </Grid>
      </div>

      {keyMeasures.length
        ? keyMeasures.map((item: KeyMeasure) => (
            <div style={{ display: "flex" }}>
              <div className="keymeasure-container">
                <Grid item xs={12} md={6} paddingRight={2}>
                  <TextField
                    key={`kms-${item}`}
                    className="keymeasure-input"
                    value={item.name}
                    onChange={(e) => handleChange(e.target.value, item)}
                    required
                  />
                </Grid>
                <Grid item xs={1} md={6}>
                  {item.name ? (
                    <RemoveCircleIcon
                      sx={{ marginTop: 2.5 }}
                      fontSize="small"
                      color="error"
                      onClick={() => {
                        removeKeyMeasure(objective.index, item.index);
                      }}
                    />
                  ) : null}
                </Grid>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

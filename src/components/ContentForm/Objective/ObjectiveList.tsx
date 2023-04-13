import { useEffect } from "react";
import { Objective, ObjectiveItem } from "./Objective";
import { useSelector } from "react-redux";
import { useObjectiveHelper } from "./objective.helper";
import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./Objective.css";
interface ObjectiveProps {
  index?: number;
}

export const ObjectiveList = ({ index }: ObjectiveProps) => {
  const objectives = useSelector(
    (state: any) => state.objectives.objectiveList
  );

  const { addObjective } = useObjectiveHelper();

  useEffect(() => {
    localStorage.setItem("objectives", JSON.stringify(objectives));
  }, [objectives]);

  const handleAddObjective = () => {
    if (objectives.length >= 3) {
      alert("You can only have 3 objectives.");
      return;
    }
    addObjective();
  };

  return (
    <>
      {objectives
        ? objectives.map((item: ObjectiveItem) => (
            <div className="objective-container">
              <Objective
                key={`objective-index-${item.index}`}
                objective={item}
              />
            </div>
          ))
        : null}

      <div className="button-container">
        <Button
          sx={{
            height: "43px",
            textTransform: "none",
            background: "#25397d",
          }}
          variant="contained"
          size="small"
          onClick={() => handleAddObjective()}
        >
          <AddCircleIcon fontSize="small" sx={{ marginRight: "10px" }} />
          Add Objective
        </Button>
      </div>
    </>
  );
};

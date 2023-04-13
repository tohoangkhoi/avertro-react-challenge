import { ObjectiveItem } from "./Objective";
import { useSelector, useDispatch } from "react-redux";
import { ObjectiveActionType, ObjectiveVar } from "../../../reducers/objective";
import { KeyMeasure } from "./KeyMeasures/KeyMeasures";

interface UpdateObjectivePayload {
  updatedItem: ObjectiveItem;
}

interface RemoveObjectivePayload {
  selectedIndex: number;
}

export const useObjectiveHelper = () => {
  const objectives = useSelector(
    (state: any) => (state.objectives as ObjectiveVar).objectiveList
  );

  const dispatch = useDispatch();

  const addObjective = () => {
    dispatch({
      type: ObjectiveActionType.ADD,
      payload: {
        index: objectives.length + 1,
        name: "",
        startDate: "",
        endDate: "",
        keyMeasures: [{ name: "" }],
      },
    });
  };

  const handleUpdateObjective = ({ updatedItem }: UpdateObjectivePayload) => {
    const updatedObjectives = objectives.map((item) => {
      if (item.index === updatedItem.index) {
        return updatedItem;
      }
      return item;
    });

    dispatch({ type: ObjectiveActionType.UPDATE, payload: updatedObjectives });
  };

  const handleRemoveObjective = ({ selectedIndex }: RemoveObjectivePayload) => {
    const updateObjectives = objectives.filter(
      (item) => item.index !== selectedIndex
    );

    // update the index of current obj list
    // all items that come after deleted-objective, item.index -=1
    updateObjectives.forEach((item) => {
      if (item.index > selectedIndex) {
        item.index -= 1;
      }
    });

    dispatch({ type: ObjectiveActionType.REMOVE, payload: updateObjectives });
  };

  const addKeyMeasure = (objectiveIndex: number) => {
    const updateObjectives = objectives.map((item) => {
      if (item.index === objectiveIndex) {
        const { keyMeasures: oldList } = item;
        return {
          ...item,
          keyMeasures: [...oldList, { index: oldList.length + 1, name: "" }],
        };
      }
      return item;
    });

    dispatch({
      type: ObjectiveActionType.UPDATE,
      payload: updateObjectives,
    });
  };

  const updateKeyMeasure = (
    objectiveIndex: number,
    { index, name }: KeyMeasure
  ) => {
    const updateObjectives = [...objectives];

    // find and update the selected key measure
    updateObjectives.forEach((item) => {
      if (item.index === objectiveIndex) {
        item.keyMeasures.forEach((keyMeasureItem) => {
          if (keyMeasureItem.index === index) {
            keyMeasureItem.name = name;
          }
        });
      }
    });

    dispatch({
      type: ObjectiveActionType.UPDATE,
      payload: updateObjectives,
    });
  };

  const removeKeyMeasure = (
    objectiveIndex: number,
    keyMeasureIndex: number
  ) => {
    const cloneObjectives = [...objectives];
    // find the selected objective
    const selectedObjective = cloneObjectives.filter(
      (item) => item.index === objectiveIndex
    );

    // find and remove the selected key measure
    let keyMeasures: KeyMeasure[] = selectedObjective[0].keyMeasures;

    const updatedKeyMeasure = keyMeasures.filter(
      (item) => item.index !== keyMeasureIndex
    );

    // update the index of the existing key measure items
    updatedKeyMeasure.forEach((item) => {
      if (item.index > keyMeasureIndex) {
        item.index -= 1;
      }
    });

    // add it to the objective list
    const updateObjectives = objectives.map((item) => {
      if (item.index === objectiveIndex) {
        return {
          ...item,
          keyMeasures: updatedKeyMeasure,
        };
      }
      return item;
    });

    dispatch({
      type: ObjectiveActionType.UPDATE,
      payload: updateObjectives,
    });
  };

  return {
    addObjective,
    addKeyMeasure,
    handleRemoveObjective,
    handleUpdateObjective,
    removeKeyMeasure,
    updateKeyMeasure,
  };
};

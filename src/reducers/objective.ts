import { KeyMeasure } from "../components/ContentForm/Objective/KeyMeasures/KeyMeasures";
import { ObjectiveItem } from "../components/ContentForm/Objective/Objective";

export enum ObjectiveActionType {
  UPDATE = "UPDATE",
  ADD = "ADD",
  REMOVE = "REMOVE",
}

interface ObjectiveAction {
  type: ObjectiveActionType;
  payload: any;
}

export interface ObjectiveVar {
  objectiveList: ObjectiveItem[];
  selectedKeyMeasure?: KeyMeasure;
}

const initialState: ObjectiveVar = {
  selectedKeyMeasure: undefined,
  objectiveList: [
    {
      index: 1,
      name: "",
      startDate: "",
      endDate: "",
      keyMeasures: [],
    },
  ],
};

export const objectiveReducer = (
  state = initialState,
  { type, payload }: ObjectiveAction
) => {
  switch (type) {
    case ObjectiveActionType.ADD:
      return {
        ...state,
        objectiveList: [
          ...state.objectiveList,
          {
            index: state.objectiveList.length + 1,
            name: "",
            startDate: "",
            endDate: "",
            keyMeasures: [],
          },
        ],
      };

    case ObjectiveActionType.UPDATE:
      return {
        ...state,
        objectiveList: payload,
      };

    case ObjectiveActionType.REMOVE:
      return { ...state, objectiveList: payload };

    default:
      return state;
  }
};

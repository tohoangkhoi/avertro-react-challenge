import { combineReducers } from "redux";
import { objectiveReducer } from "./objective";

export const rootReducer = combineReducers({
  objectives: objectiveReducer,
});

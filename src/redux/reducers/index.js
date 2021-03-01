import { combineReducers } from "redux";
import ui from "./ui";
import app from "./app";

const appReducers = combineReducers({
  ui,
  app,
});

export default appReducers;

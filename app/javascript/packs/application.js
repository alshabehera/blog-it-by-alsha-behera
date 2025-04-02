import "../stylesheets/application.scss";
import ReactRailsUJS from "react_ujs";
import App from "../src/App";
import {initializeLogger} from "../src/common/logger.js";
import { registerIntercepts, setAuthHeaders } from "apis/axios";


registerIntercepts();
initializeLogger();
setAuthHeaders();

const componentsContext = { App };
ReactRailsUJS.getConstructor = (name) => {
  return componentsContext[name];
};
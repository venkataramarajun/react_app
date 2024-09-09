import { combineReducers } from "redux";
import { EmployeeReducer } from "./employeeReducers";

const rootReducer = combineReducers({employee:EmployeeReducer});
export default rootReducer;
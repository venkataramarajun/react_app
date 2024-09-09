import {
  FETCH_EMPLOYEES,
  FETCH_SELECTED_EMPLOYEE,
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE
} from "../action-types/employeeActionTypes";

export const fetchAllEmployees = (data) => {
  return {
    type: FETCH_EMPLOYEES,
    payload: {data},
  };
};

export const getSelectedEmployee = (data) => {
  return{
    type: FETCH_SELECTED_EMPLOYEE,
    payload: {data}
  }
}

export const deleteEmployee = (id) => {
  return {
    type: DELETE_EMPLOYEE,
    payload: id,
  };
};

export const updateEmployee = (id, updatedData) => {
  return {
    type: UPDATE_EMPLOYEE,
    payload: {id, updatedData}
  }
}
export const addEmployee = (data) => {
  return{
    type: ADD_EMPLOYEE,
    payload: {data}
  }
}


import {
  FETCH_EMPLOYEES,
  FETCH_SELECTED_EMPLOYEE,
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
} from "../action-types/employeeActionTypes";

const initialState = {
  employeeData: [],
  selectedEmployeeId: null,
  selectedEmployeeDetails: {},
};

export const EmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES:
      return { ...state, employeeData: action.payload.data };

    case FETCH_SELECTED_EMPLOYEE:
      return { ...state, selectedEmployeeDetails: action.payload.data };

    case DELETE_EMPLOYEE:
      return {
        ...state,
        employeeData: state.employeeData.filter((employee) => employee.id !== action.payload),
      };

    case UPDATE_EMPLOYEE:
      return {
        ...state,
        employeeData: state.employeeData.map((employee) =>
          employee.id === action.payload.id
            ? {
                ...employee,
                ...action.payload.updatedData,
              }
            : employee
        ),
      };

    case ADD_EMPLOYEE:
      return { ...state, employeeData: [...state.employeeData, action.payload.data] };

    default:
      return state;
  }
};

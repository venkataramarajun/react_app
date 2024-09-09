import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { addEmployee } from "../Redux/actions/employeeActions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialEmployeeData = {
  name: "",
  email: "",
  designation: "",
  salary: '',
};

const AddEmployee = ({ employeeData, addEmployee }) => {
  const [newEmployee, setNewEmployee] = useState(initialEmployeeData);
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();

  const confirmAdd = () => {
    fetch(`http://localhost:3001/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newEmployee.name,
        email: newEmployee.email,
        designation: newEmployee.designation,
        salary: newEmployee.salary,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        addEmployee(data);
        navigate('/'); // Navigate to the employee list or home page after adding
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleCancel = () => {
    navigate('/'); // Navigate to the employee list or home page on cancel
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <NewEmployeeFormComponent
        newEmployee={newEmployee}
        setNewEmployee={setNewEmployee}
        confirmAdd={confirmAdd}
        handleCancel={handleCancel}
        isConfirmDisabled={
          newEmployee.name === "" ||
          newEmployee.email === "" ||
          !validateEmail(newEmployee.email)
        }
      />
    </>
  );
};

const NewEmployeeFormComponent = ({ newEmployee, setNewEmployee, confirmAdd, handleCancel, isConfirmDisabled }) => {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            value={newEmployee.name}
            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={newEmployee.email}
            onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Designation</Form.Label>
          <Form.Control
            type="text"
            name="designation"
            value={newEmployee.designation}
            onChange={(e) => setNewEmployee({ ...newEmployee, designation: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Salary</Form.Label>
          <Form.Control
            type="text"
            name="salary"
            value={newEmployee.salary}
            onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
          />
        </Form.Group>
        <Button 
          variant="primary" 
          onClick={confirmAdd}
          disabled={isConfirmDisabled}
        >
          Add
        </Button>
        <Button 
          variant="secondary" 
          onClick={handleCancel}
          className="ms-2"
        >
          Cancel
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    employeeData: state.employee.employeeData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addEmployee: (data) => dispatch(addEmployee(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEmployee);

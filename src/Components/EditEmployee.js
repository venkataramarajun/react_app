import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { updateEmployee } from "../Redux/actions/employeeActions";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = ({ updateEmployee }) => {
  const [employee, setEmployee] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/employees/${id}`)
      .then((response) => response.json())
      .then((data) => setEmployee(data))
      .catch((error) => console.error("Error fetching employee data:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
    validateForm();
  };

  const validateForm = () => {
    if (employee) {
      setIsFormValid(
        employee.name && employee.email && validateEmail(employee.email)
      );
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    fetch(`http://localhost:3001/employees/${employee.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    })
      .then((response) => response.json())
      .then((data) => {
        updateEmployee(employee.id, data);
        navigate('/');
      })
      .catch((error) => console.error("Error updating employee:", error));
  };

  return (
    employee && (
      <div>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={employee.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Designation</Form.Label>
            <Form.Control
              type="text"
              name="designation"
              value={employee.designation}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Salary</Form.Label>
            <Form.Control
              type="text"
              name="salary"
              value={employee.salary}
              onChange={handleChange}
            />
          </Form.Group>
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Update
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => navigate('/')}
            className="ms-2"
          >
            Cancel
          </Button>
        </Form>
      </div>
    )
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateEmployee: (id, data) => dispatch(updateEmployee(id, data)),
  };
};

export default connect(null, mapDispatchToProps)(EditEmployee);

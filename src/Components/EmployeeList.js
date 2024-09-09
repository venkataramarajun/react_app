import React, { useEffect, useState } from "react";
import {
  deleteEmployee,
  fetchAllEmployees,
  updateEmployee,
} from "../Redux/actions/employeeActions";
import { connect } from "react-redux";
import { Col, Container, Row, Table, Form, Button } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ModalComponent from "./UI/ModalComponent";
// import AddEmployee from "./AddEmployee";
import { useNavigate } from "react-router-dom";

const EmployeeList = ({ employeeData, fetchAllEmployees, deleteEmployee, updateEmployee }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  // on clicking delete icon
  const handleDelete = (employeeInfo) => {
    setShowDeleteModal(true);
    setSelectedEmployee(employeeInfo);
  };

  // on clicking edit icon
  const handleEdit = (employeeInfo) => {
    navigate(`/edit/${employeeInfo.id}`);
  };

  // fetch all employee list
  const getAllEmployees = () => {
    fetch("http://localhost:3001/employees")
      .then((response) => response.json())
      .then((data) => fetchAllEmployees(data))
      .catch((error) => console.log(error));
  };

  // clicking confirm delete on modal
  const confirmDelete = () => {
    fetch(`http://localhost:3001/employees/${selectedEmployee.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok === true) {
          deleteEmployee(selectedEmployee.id);
        }
        setShowDeleteModal(false);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  // clicking confirm update on modal
  const confirmUpdate = () => {
    fetch(`http://localhost:3001/employees/${selectedEmployee.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: selectedEmployee.id,
        name: selectedEmployee.name,
        email: selectedEmployee.email,
        designation: selectedEmployee.designation,
        salary: selectedEmployee.salary,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        updateEmployee(selectedEmployee.id, data);
        setShowEditModal(false);
        navigate('/');
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  // function to validate emil address
  const validateEmail = (email) => {
    const emailRegex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleAdd = () => {
    // setShowAddModal(true);
    navigate('/add');
  };

  return (
    <>
    
      <Container>
        <Row className="py-5 mt-5">
          {/* <AddEmployee /> */}
          <Col>
        <Button variant="outline-primary" className="pe-none">
        All Employees <span class="badge bg-secondary">{employeeData.length}</span>
        </Button>
      </Col>
      <Col className="text-end">
        <Button variant="primary" onClick={handleAdd}>
          Add Employee
        </Button>
      </Col>
          
        </Row>
        <Row>
          <Col>
          
            <Table hover responsive="sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Designation</th>
                  <th>Salary</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {employeeData.map((ele) => (
                  <tr key={ele.id}>
                    <td className="fw-bold">{ele.name}</td>
                    <td>{ele.email}</td>
                    <td>{ele.designation}</td>
                    <td>{ele.salary}</td>
                    <td>
                      <Row>
                        <Col>
                          <AiFillEdit
                            onClick={() => handleEdit(ele)}
                            color="dodgerblue"
                            role="button"
                          />
                        </Col>
                        <Col>
                          <AiFillDelete
                            onClick={() => handleDelete(ele)}
                            color="red"
                            role="button"
                          />
                        </Col>
                      </Row>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>


      
      {showDeleteModal && (
        <ModalComponent
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
          confirmAction={confirmDelete}
          title="Delete Employee"
          content="Are you sure you want to delete this employee ?"
          confirmButtonText="Confirm"
          cancelButtonText="Cancel"
        />
      )}

      {/* {showEditModal && (
        <ModalComponent
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          confirmAction={confirmUpdate}
          title="Edit Employee"
          content={
            <FormComponent
              selectedemployee={selectedEmployee}
              setselectedemployee={setSelectedEmployee}
            />
          }
          confirmButtonText="Update"
          cancelButtonText="Cancel"
          isConfirmDisabled={
            selectedEmployee.name === "" ||
            selectedEmployee.email === "" ||
            !validateEmail(selectedEmployee.email)
          }
        />
      )} */ 

      // <NewEmployeeFormComponent
      //   newEmployee={newEmployee}
      //   setNewEmployee={setNewEmployee}
      //   confirmAdd={confirmAdd}
      //   handleCancel={handleCancel}
      //   isConfirmDisabled={
      //     newEmployee.name === "" ||
      //     newEmployee.email === "" ||
      //     !validateEmail(newEmployee.email)
      //   }
      // />
    }
    </>
  );
};

const FormComponent = ({ selectedemployee, setselectedemployee }) => {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="name"
            name="name"
            value={selectedemployee.name}
            onChange={(e) =>
              setselectedemployee({ ...selectedemployee, name: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="email"
            name="email"
            value={selectedemployee.email}
            onChange={(e) =>
              setselectedemployee({ ...selectedemployee, email: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Designation</Form.Label>
          <Form.Control
            type="text"
            name="designation"
            value={selectedemployee.designation}
            onChange={(e) =>
              setselectedemployee({
                ...selectedemployee,
                designation: e.target.value
              })
            }
          >
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Salary</Form.Label>
          <Form.Control
            type="text"
            name="salary"
            value={selectedemployee.salary}
            onChange={(e) =>
              setselectedemployee({
                ...selectedemployee,
                isActive: e.target.value
              })}
          >
          </Form.Control>
        </Form.Group>
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
    fetchAllEmployees: (data) => dispatch(fetchAllEmployees(data)),
    deleteEmployee: (id) => dispatch(deleteEmployee(id)),
    updateEmployee: (id, data) => dispatch(updateEmployee(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);

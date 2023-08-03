import React, { useState, useEffect } from "react";
import EmployeeServices from "../services/EmployeeServices";
import { Link } from "react-router-dom";

function ListAllEmployees() {
  // state, set value to the state = intital value of state
  const [employees, setEmployees] = useState([]);

  // call get employees after each render
  useEffect(() => {
    getEmployees();
  }, []);

  // get employees function
  const getEmployees = () => {
    // call my services getEmployee function then set the response
    EmployeeServices.getEmployees().then((reponse) => {
      //set employees equal to the reponse data
      setEmployees(reponse.data);
      //testing to see if we got a response in the console.
      // console.log(reponse.data);
    });
  };

  //get sorted employees by first name
  const sortEmployees = () =>{
    EmployeeServices.getSortedEmployees().then((response) =>{
        // console.log(response.data); testing response
        setEmployees(response.data);
    });
  };

  // sort employees by last name
  const sortEmployeesByLastName = () => {
    EmployeeServices.getSortedEmployeesByLastName().then((response) => { 
        setEmployees(response.data);
    });
  };

  const sortEmployeesById = () => {
    EmployeeServices.getSortedEmployeesById().then((response) =>{
        setEmployees(response.data);
    });
  };

  // delete employee function
  const deleteEmployee = (employeeId) => {
    EmployeeServices.deleteEmployee(employeeId)
      .then((response) => {
        getEmployees();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center"> Employee Database</h2>
      <Link to="/add-employee" className="btn btn-primary md-2">
        {" "}
        Add Employee
      </Link>
      {/* can add table-striped */}
      <br></br>
      <br></br>
      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th style={{ cursor: 'pointer'}} onClick={() => sortEmployeesById()}>Employee ID</th>
            <th style={{ cursor: 'pointer'}} onClick={() => sortEmployees()}>Employee First Name</th>
            <th style={{ cursor: 'pointer'}} onClick={() => sortEmployeesByLastName()}>Employee Last Name</th>
            <th>Employee Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td> {employee.id} </td>
              <td> {employee.firstName} </td>
              <td> {employee.lastName} </td>
              <td> {employee.email} </td>
              <td>
                <Link
                  className="btn btn-info"
                  to={`/update-employee/${employee.id}`}
                >
                  Update
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteEmployee(employee.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <br></br>
    </div>
  );
}

export default ListAllEmployees;
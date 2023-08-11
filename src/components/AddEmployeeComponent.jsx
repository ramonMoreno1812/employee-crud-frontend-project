import { useState, useEffect } from "react";
// useHistory is replacd by useNavigate in react-router-dom v6
import { useNavigate, Link, useParams } from "react-router-dom";
import EmployeeServices from "../services/EmployeeServices";

const AddEmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  //create employee object
  const employee = { firstName, lastName, email };

  // errors to be displayed when inputs are wrong
  const [formErrors, setFormErrors] = useState("");
  // check to see if submit button is seleted set to false
  const [isSubmit, setIsSubmit] = useState(false);

  // to navigate to other pages. import from router dom HISTORY IS NO LONGER IN USE AFter dom V6
  const navigate = useNavigate();
  // use params hook has object that has key value form URL
  const { id } = useParams();

  // save or update employee method
  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    // validate employee object
    setFormErrors(validateEmployeeData(employee));
    setIsSubmit(true);
  };

  useEffect(() => {

    // if there are no errors and submit is true
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      if (id) {
        EmployeeServices.updateEmployee(id, employee)
          .then(() => {
            navigate("/employees");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        EmployeeServices.createEmployee(employee)
          .then((response) => {
            // return to employees display page
            navigate("/employees");
          })
          .catch((error) => {
            console.log(error);
          });
      } 
    } 
    // rerenders only when the array below changes!
  }, /*[formErrors]*/)

  useEffect(() => {
    // if an id exsists retreve information for update employee
    if (id) {
      EmployeeServices.getEmployeeById(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setlastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.log(error);
        });
    }  
  }, [id]);

  // validate my inputs for my employee obj.
  const validateEmployeeData = (employee) => {
    const errors = {};
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const stringRegex = /^[A-Za-z]+$/;

    if (!employee.firstName) {
      errors.firstName = "* First Name is Required!";
    } else if (!stringRegex.test(employee.firstName)) {
      errors.firstName = "Only letters are are allowed in your first name!";
    }
    if (!employee.lastName) {
      errors.lastName = "* Last Name is Required";
    } else if (!stringRegex.test(employee.lastName)) {
      errors.lastName = "Only letters are are allowed in your last name!";
    }
    if (!employee.email) {
      errors.email = "* an Email address is Required";
    } else if (!regex.test(employee.email)) {
      errors.email = "Email must be in ----@-mail.com format";
    }

    return errors;
  };

  const title = () => {
    // if variable id returns a value change the title to update employee
    if (id) {
      return <h2 className="text-center"> Update Employee </h2>;
    } else {
      // other wise the id variable was emply and theirfore it was an update
      return <h2 className="text-center"> Add Employee </h2>;
    }
  };

  return (
    <div>
      <br></br>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offest-md-3">
            {title()}
            <div className="card-body">
              <form>
                {/*this input group is for first name */}
                <div className="form-group mb-2">
                  <label className="form-label"> First Name:</label>
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    name="firstName"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  ></input>
                </div>
                <p style={{ color: "red" }}>{formErrors.firstName}</p>
                {/*this input group is for last name */}
                <div className="form-group mb-2">
                  <label className="form-label"> Last Name:</label>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    name="lastName"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                  ></input>
                </div>
                <p style={{ color: "red" }}>{formErrors.lastName}</p>
                {/*this input group is for email */}
                <div className="form-group mb-2">
                  <label className="form-label"> email:</label>
                  <input
                    type="text"
                    placeholder="Enter email"
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <p style={{ color: "red" }}>{formErrors.email}</p>
                <button
                  className="btn btn-success"
                  onClick={(e) => saveOrUpdateEmployee(e)}
                >
                  Submit
                </button>
                <Link to="/employees" className="btn btn-danger">
                  {" "}
                  Cancel{" "}
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeComponent;

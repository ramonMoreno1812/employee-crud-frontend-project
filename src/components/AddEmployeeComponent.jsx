import { useState, useEffect, } from "react";
// useHistory is replacd by useNavigate in react-router-dom v6
import { useNavigate, Link, useParams } from 'react-router-dom';
import EmployeeServices from "../services/EmployeeServices";


const AddEmployeeComponent = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");

    // to navigate to other pages. import from router dom HISTORY IS NO LONGER IN USE AFter dom V6
    const navigate = useNavigate();
    // use params hook has object that has key value form URL
    const {id} = useParams();

    // save employee method 
    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        const employee = {firstName, lastName, email}
        //testing to see if form is taking in employee input data
        // console.log(employee);
        
        if(id){
            EmployeeServices.updateEmployee(id, employee).then(() => {
                navigate('/employees');
            }).catch(error => {
                console.log(error);
            })
        }else{

            EmployeeServices.createEmployee(employee).then((response) => {

                //testing data is placed in the console.
                console.log(response.data)
                // return to employees display page
                navigate('/employees');
    
            }).catch(error => {
                console.log(error);
            })
        }
    }

    useEffect(() => {
       
        EmployeeServices.getEmployeeById(id)
        .then((response) => {

            setFirstName(response.data.firstName)
            setlastName(response.data.lastName)
            setEmail(response.data.email)

        }).catch(error => {
            console.log(error)
        })

    }, []);


    const title = () =>{
        // if variable id returns a value change the title to update employee
        if(id){
            return <h2 className="text-center"> Update Employee </h2>
        } else {
            // other wise the id variable was emply and theirfore it was an update
            return <h2 className="text-center"> Add Employee </h2>
        }
    }

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
                                <input type="text" placeholder="Enter First Name" 
                                       name="firstName" className="form-control" 
                                       value={firstName} onChange={(e) => setFirstName(e.target.value)}>

                                </input>
                            </div>
                            {/*this input group is for last name */}
                            <div className="form-group mb-2">
                                <label className="form-label"> Last Name:</label>
                                <input type="text" placeholder="Enter Last Name" 
                                       name="lastName" className="form-control" 
                                       value={lastName} onChange={(e) => setlastName(e.target.value)}>

                                </input>
                            </div>
                            {/*this input group is for email */}
                            <div className="form-group mb-2">
                                <label className="form-label"> email:</label>
                                <input type="text" placeholder="Enter email" 
                                       name="email" className="form-control" 
                                       value={email} onChange={(e) => setEmail(e.target.value)}>

                                </input>
                            </div>
                            <button className="btn btn-success" onClick={(e) => saveOrUpdateEmployee(e)}>Submit</button>
                            <Link to="/employees" className="btn btn-danger"> Cancel </Link>
                        </form>
                    </div>
                </div>
            </div>      
        </div>  
    </div>
  )
}

export default AddEmployeeComponent
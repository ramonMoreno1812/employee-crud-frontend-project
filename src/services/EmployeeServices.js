import axios from "axios";

const EMPLOYEES_REST_API_URL = 'http://localhost:8080/api/V1/employees';
const EMPLOYEES_SORT_REST_API_URL = 'http://localhost:8080/api/V1/employees/sort';
const EMPLOYEES_SORTBR_LASTNAME_API_URL = 'http://localhost:8080/api/V1/employees/sortByLastName';
const EMPLPLOYEES_SORTBYID_REST_API_URL = 'http://localhost:8080/api/V1/employees/sortById';

class EmployeeServices {

    getEmployees(){
        return axios.get(EMPLOYEES_REST_API_URL);
    }

    // sorting method by abc
    getSortedEmployees(){
        return axios.get(EMPLOYEES_SORT_REST_API_URL);
    }

     // sorting method by lastName
     getSortedEmployeesByLastName(){
        return axios.get(EMPLOYEES_SORTBR_LASTNAME_API_URL);
    }

    // sorting method by Id
    getSortedEmployeesById(){
        return axios.get(EMPLPLOYEES_SORTBYID_REST_API_URL);
    }

    //create employee method
    createEmployee(employee){
        return axios.post(EMPLOYEES_REST_API_URL, employee);
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEES_REST_API_URL + '/' + employeeId);

    }

    updateEmployee(employeeId, employee){
        return axios.put(EMPLOYEES_REST_API_URL + '/' + employeeId, employee);
    }

    deleteEmployee(employeeID){
        return axios.delete(EMPLOYEES_REST_API_URL + '/' + employeeID);
    }

}

export default new EmployeeServices();
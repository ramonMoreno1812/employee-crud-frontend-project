import AddEmployeeComponent from "./components/AddEmployeeComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import ListAllEmployees from "./components/ListAllEmployees";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent />
        <div className="container">
          <Routes>
            <Route path="/" element={<ListAllEmployees />}></Route>
            <Route path="/employees" element={<ListAllEmployees />}></Route>
            <Route path="/add-employee" element={<AddEmployeeComponent />}></Route>
            <Route path="/update-employee/:id" element={<AddEmployeeComponent />}></Route>
          </Routes>
        </div>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;

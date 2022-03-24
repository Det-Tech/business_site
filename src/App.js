import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import Customer from "./components/customer/customer.main";
import Business from "./components/business/business.main.js";
import Addappointment from "./components/customer/customer.addComponent";
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <div>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/business" element={<Business />} />
            <Route path="/add_appointment" element={<Addappointment />} />
          </Routes>
        </div>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;

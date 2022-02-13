import logo from "./logo.svg";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
function App() {
  return (
    <div>
     <div className="">
     <Sidebar />
     <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
     </div>
    </div>
  );
}

export default App;

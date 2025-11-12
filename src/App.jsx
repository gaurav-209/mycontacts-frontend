import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import PrivateRoute from "./components/layout/PrivateRoute";
import Navbar from "./components/layout/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Navbar />
      <Toaster position="top-right" />
      <div className="container mx-auto p-4">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />

          {/* Protected route */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

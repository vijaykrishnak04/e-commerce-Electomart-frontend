import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/admin/AdminRoutes";


function App() {
  return (
    <div className="bg-[#E3E6E6]">
      <Router>
        <Routes>
          <Route path='/admin/*' element={<AdminRoutes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

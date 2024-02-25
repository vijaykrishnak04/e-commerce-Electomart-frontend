import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/admin/AdminRoutes";
import UserRoutes from "./routes/users/UserRoutes";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/admin/*' element={<AdminRoutes />} />
          <Route path="/*" element={<UserRoutes />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

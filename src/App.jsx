import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/admin/AdminRoutes";


function App() {
    return (
        <>
            <Router>
              <Routes>
                <Route path='/admin/*' element={<AdminRoutes />}  />
              </Routes>
            </Router>
        </>
    );
}

export default App;

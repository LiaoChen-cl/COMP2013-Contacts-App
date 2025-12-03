import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ContactsApp from "./Components/ContactsApp"; 
import RegisterPage from "./Components/RegisterPage";
import PageNotFound from "./Components/PageNotFound";
import LoginPage from "./Components/LoginPage";
import PrivateRoute from "./Components/PrivateRoute";
import NotAuthorized from "./Components/NotAuthorized";

function App() {
  return (
    <Router>
      <Routes>
        {/* private routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/contacts" element={<ContactsApp />} />
        </Route>

        {/* public routes */}
        <Route path="/" element={<LoginPage />} /> {/* login page */}
        <Route path="/register" element={<RegisterPage />} /> {/* register page */}
        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

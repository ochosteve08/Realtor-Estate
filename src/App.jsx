import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Offer from "./Pages/Offer";
import Profile from "./Pages/Profile";
import SignIn from "./Pages/SignIn";
import SignUP from "./Pages/SignUp";
import ForgotPassword from "./Pages/ForgotPassword";
import Header from "./Components/Header";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUP />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/offers" element={<Offer />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

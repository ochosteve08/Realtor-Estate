import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Offer from "./Pages/Offer";
import Profile from "./Pages/Profile";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import PrivateRoute from "./Components/PrivateRoute";
import ForgotPassword from "./Pages/ForgotPassword";
import Header from "./Components/Header";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateListing from "./Pages/CreateListing";
import EditListing from "./Pages/EditListing";
import Listing from "./Pages/Listing";
import Category from "./Components/Category";


function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/offers" element={<Offer />} />
          <Route path="/category/:categoryName/:listingId" element={<Listing />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="create-listing" element={<PrivateRoute />}>
             <Route path="/create-listing" element={<CreateListing />} />
          </Route>
          <Route path="edit-listing" element={<PrivateRoute />}>
             <Route path="/edit-listing/:listingId" element={<EditListing />} />
          </Route>
          <Route path="edit-listing" element={<PrivateRoute />}>
             <Route path="/edit-listing/:listingId" element={<EditListing />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;

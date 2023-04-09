import { Outlet, Navigate } from "react-router-dom";
import { useAuthStatus } from "../Hooks/useAuthStatus";
import Spinner from "./Spinner";
export default function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();
    if (checkingStatus) {
      return <Spinner />;
  // return <h3 className="text-center">loading....</h3>
    }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}

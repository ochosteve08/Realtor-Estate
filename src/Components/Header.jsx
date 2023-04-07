import React from "react";
import { useLocation, useNavigate } from "react-router";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    } else return false;
  };
  return (
    <div className="bg-white shadow-md border-b sticky top-0 z-50 ">
      <header className="flex justify-between items-center px-4 max-w-6xl mx-auto">
        <div>
          <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="logo"
            className="w-32 cursor-pointe md:w-60"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="">
          <ul className=" flex space-x-3 md:space-x-12 pr-4">
            <li
              className={`py-3 text-sm md:text-xl  text-black font-semibold hover:cursor-pointer border-b-3  ${
                pathMatchRoute("/") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`py-3 text-sm md:text-xl  text-black font-semibold  hover:cursor-pointer border-b-3 border-transparent ${
                pathMatchRoute("/offers") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`py-3 text-sm md:text-xl  text-black font-semibold  hover:cursor-pointer border-b-3 border-transparent ${
                pathMatchRoute("/sign-in") && "border-b-red-500 "
              }`}
              onClick={() => navigate("/sign-in")}
            >
              SignIn
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;

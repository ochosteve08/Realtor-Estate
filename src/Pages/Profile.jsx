import React from "react";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  let { name, email } = formData;

  const navigate = useNavigate();

  const logOut=()=>{
    auth.signOut();
     navigate("/");

  }
  return (
    <section className="max-w-6xl">
      <h1 className=" text-3xl text-center font-bold mt-6">My Profile</h1>
      <div className=" w-full xs:w-3/4 md:w-1/2  mx-auto mt-6 px-3 ">
        <form>
          <input
            className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
            type="text"
            id="name"
            value={name}
            disabled
          />
          <input
            className="w-full px-4 py-2 text-xl text-gray-700  mb-6 bg-white border-gray-300 rounded transition ease-in-out"
            type="email"
            value={email}
            disabled
          />

          <div className="flex justify-between   text-sm sm:text-lg mb-6">
            <p className="w-3/4  ">
              Do want to change your name?
              <span className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1 cursor-pointer">
                Edit
              </span>
            </p>
            <p onClick={logOut} className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer">
              Sign Out
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;

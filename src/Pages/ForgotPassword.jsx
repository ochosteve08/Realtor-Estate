import React, { useState } from "react";
import { Link } from "react-router-dom";
import Oauth from "../Components/Oauth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";

const forgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await sendPasswordResetEmail(auth, email);

      console.log(user);
      toast.success("Email was sent successfully");
      if (user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("could not reset password", error);
    }
  };

  return (
    <section>
      <h1 className=" text-3xl text-center font-bold mt-6">Forgot Password</h1>
      <div className="flex justify-center items-center flex-wrap py-12 px-6 max-w-6xl mx-auto">
        <div className="w-full md:w-[67%] lg:w-[50%] mb-12 md:mb-6 ">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-2/3 lg:w-2/5 lg:ml-20">
          <form onSubmit={onSubmit}>
            <input
              className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email address"
            />

            <div className="flex justify-between  text-sm sm:text-lg mb-6">
              <p>
                Don't have an account?
                <Link
                  to="/sign-up"
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to="/sign-in"
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
                >
                  SignIn
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-2 text-white rounded-sm uppercase font-medium text-sm transition duration-150 ease-in-out"
              type="submit shadow-md hover:shadow-lg active:bg-blue-800"
            >
              Send Reset Password
            </button>
            <div className="flex items-center  my-4 before:border-t-3 before:flex-1 before:border-gray-300 after:border-t-3 after:flex-1 after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <Oauth />
          </form>
        </div>
      </div>
    </section>
  );
};

export default forgotPassword;

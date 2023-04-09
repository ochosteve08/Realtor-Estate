import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const [changeDetail, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
    photo: auth.currentUser.photoURL,
  });

  let { name, email, photo } = formData;

  const navigate = useNavigate();

  const logOut = () => {
    auth.signOut();
    navigate("/");
  };

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        console.log(name);

        //update display name in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // update name in the firestore

        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Profile details updated");
    } catch (error) {
      toast.error("Could not update the profile details");
    }
  };

  return (
    <section className="max-w-6xl">
      <h1 className=" text-3xl text-center font-bold mt-6">My Profile</h1>
      <div className="flex justify-center mt-6">
        <img className="rounded-full" src={photo} alt="profile-pic" />
      </div>
      <div className=" w-full xs:w-3/4 md:w-1/2  mx-auto mt-6 px-3 ">
        <form>
          <input
            className={`w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out ${
              changeDetail && "bg-red-200 focus:bg-red-200"
            }`}
            type="text"
            id="name"
            value={name}
            disabled={!changeDetail}
            onChange={onChange}
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
              <span
                onClick={() => {
                  changeDetail && onSubmit();
                  setChangeDetail((prevState) => !prevState);
                }}
                className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1 cursor-pointer"
              >
                {changeDetail ? "Apply Changes" : "Edit"}
              </span>
            </p>
            <p
              onClick={logOut}
              className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer"
            >
              Sign Out
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;

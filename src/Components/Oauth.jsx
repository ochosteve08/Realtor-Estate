import React from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";



const Oauth = () => {
    const navigate = useNavigate();
  const googleClick=async()=>{

      try{
    
       const provider = new GoogleAuthProvider();
       const result = await  signInWithPopup(auth, provider);
       const credential = GoogleAuthProvider.credentialFromResult(result);
       const token = credential.accessToken;
       const user = result.user;
       console.log(user);
      const docRef = doc(db, "users/" + user.uid);
      const docSnap = await getDoc(docRef, token);

      if(!docSnap.exists()) {
        setDoc(docRef, {name: user.displayName,
        email: user.email,
      timestamp: serverTimestamp()})
      }

       toast.success("successful");
        navigate("/");
       
      }
      catch(error){
          console.log(error.code, error.message);
        toast.error("could not authorize wth Google");
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      }

  }
  return (
    <button type="button" onClick={googleClick} className=" flex w-full bg-red-600 hover:bg-red-700 px-6 py-2 text-white rounded-sm uppercase font-medium text-sm transition duration-150 ease-in-out items-center justify-center shadow-md hover:shadow-lg active:shadow-lg">
      <FcGoogle className="text-xl mr-2" /> Continue with Google
    </button>
  );
};

export default Oauth;

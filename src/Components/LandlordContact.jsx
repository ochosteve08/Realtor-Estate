import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";

const LandlordContact = ({ listing }) => {
  const [landlordContact, setLandlordContact] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      const docRef = doc(db, "users", listing.userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlordContact(docSnap.data());
      } else {
        toast.error("couldn't find Landlord contact");
      }
    };
    fetchDetails();
  }, [listing.useRef]);

  return (
    <>
      {landlordContact && (
        <div className="flex flex-col space-y-4">
          <p className="">
            Contact {landlordContact.name} for the {listing.name}
          </p>
          <textarea
            className="w-full rounded transition duration-150 ease-in-out border-slate-400 focus:border-slate-500 b-white text-lg text-gray-500"
            name="message"
            id="message"
            cols="1"
            rows="2"
            placeholder="Message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          ></textarea>
          {message && (
            <a
              href={`mailto:${landlordContact.email}?Subject=${listing.name}&body=${message}`}
            >
              <button
                type="button"
                className="bg-blue-600 w-full text-center py-2 px-6  rounded shadow-md hover:shadow-lg focus:shadow-lg hover:bg-blue-700 focus:bg-blue-700 text-white uppercase font-medium transition duration-150 ease-in-out"
              >
                send message
              </button>
            </a>
          )}
        </div>
      )}
    </>
  );
};

export default LandlordContact;

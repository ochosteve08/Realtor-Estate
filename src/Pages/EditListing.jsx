import React from 'react';
import { useState, useEffect } from 'react';
import Spinner from "../Components/Spinner";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useParams } from 'react-router-dom';
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import {  serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router";

const EditListing = () => {

    const navigate = useNavigate();
    const [geolocationEnabled, setGeolocationEnabled] = useState(false);
    const { listingId } = useParams();
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
      type: "rent",
      name: "",
      bedroom: 1,
      bathroom: 1,
      parking: false,
      furnished: false,
      address: "",
      description: "",
      offer: false,
      regular: 0,
      discount: 0,
      images: {},
      latitude: 0,
      longitude: 0,
    });

     const {
       type,
       name,
       bedroom,
       bathroom,
       parking,
       furnished,
       address,
       description,
       offer,
       regular,
       discount,
       latitude,
       longitude,
       images,
     } = formData;

     useEffect(()=>{
        if (listings && listings.userRef !== auth.currentUser.uid){
            navigate("/");
            toast.error("you don't have authorization to edit this page")
        }
     })

     useEffect(()=>{
        setLoading(true);

        const fetchListing = async() =>{
        
            const docRef = doc(db, "listings",listingId);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()){
               setLoading(false);
               setListings(docSnap.data())
               setFormData(docSnap.data());
            }
            else{
                navigate("/")
                toast.error("listing does not exist")
            }
          
        }
        fetchListing();

     },[]);

     const onChange = async (event) => {
         let boolean = null;

         if (event.target.value === "true") {
           boolean = true;
         }

         if (event.target.value === "false") {
           boolean = false;
         }

         if (event.target.files) {
           setFormData((prevState) => ({
             ...prevState,
             images: event.target.files,
           }));
         }

         if (!event.target.files) {
           setFormData((prevState) => ({
             ...prevState,
             [event.target.id]: boolean ?? event.target.value,
           }));
         }
       };

        const onSubmit = async (event) => {
          event.preventDefault();
          setLoading(true);

          if (+discount > +regular && discount !== null) {
            setLoading(false);
            toast.error("Discount price needs to be less than regular price");
            return;
          }

          if (images.length > 6) {
            setLoading(false);
            toast.error("only maximum fo 6 images are allowed");
            return;
          }

          let geoLocation = {};
          let location;

          if (geolocationEnabled) {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`
            );

            const data = await response.json();
            console.log(data);

            geoLocation.lat = data.results[0]?.geometry.location.lat ?? 0;
            geoLocation.lng = data.results[0]?.geometry.location.lng ?? 0;

            location = data.status === "ZERO_RESULTS" && undefined;

            if (location === undefined || location.include("undefined")) {
              setLoading(false);
              toast.error("please enter a correct address");
              return;
            }
          } else {
            geoLocation.lat = latitude;
            geoLocation.lng = longitude;
          }

          const storeImage = async (image) => {
            return new Promise((resolve, reject) => {
              const storage = getStorage();
              const fileName = `${auth.currentUser.uid}--${
                image.name
              }-${uuidv4()}`;
              const storageRef = ref(storage, fileName);
              const uploadTask = uploadBytesResumable(storageRef, image);

              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  // Observe state change events such as progress, pause, and resume
                  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  // Handle unsuccessful uploads
                  reject(error);
                },
                () => {
                  // Handle successful uploads on complete
                  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                  getDownloadURL(uploadTask.snapshot.ref).then(
                    (downloadURL) => {
                      console.log("File available at", downloadURL);
                      resolve(downloadURL);
                    }
                  );
                }
              );
            });
          };

          const imageUrls = await Promise.all(
            [...images].map((image) => storeImage(image))
          ).catch((error) => {
            setLoading(false);
            toast.error("images not uploaded");
            return;
          });

          const formDataCopy = {
            ...formData,
            imageUrls,
            geoLocation,
            timestamp: serverTimestamp(),
            userRef: auth.currentUser.uid,
          };
          delete formDataCopy.images;
          !formDataCopy.offer && delete formDataCopy.discount;
          delete formDataCopy.latitude;
          delete formDataCopy.longitude;
          const docRef = doc(db, "listings",listingId);
          await updateDoc(docRef, formDataCopy);
          setLoading(false);
          toast.success("listing edited successfully");
          navigate(`/category/${formDataCopy.type}/${docRef.id}`);
        };


       if (loading) {
         return <Spinner />;
       }

  return (
    <section className="max-w-lg mx-auto px-2">
      <h1 className=" text-3xl text-center font-bold mt-6">Edit Listing</h1>

      <div className=" w-full   my-6 px-3 ">
        <form onSubmit={onSubmit}>
          {/* Sell/Rent Section */}
          <p className="font-semibold text-lg mt-6">Sell/Rent</p>
          <div className="flex gap-x-6">
            <button
              type="button"
              className={`uppercase w-full  rounded-sm py-2 px-7 font-medium text-sm shadow:md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out && ${
                type === "rent"
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
              id="type"
              value="sale"
              onClick={onChange}
            >
              sell
            </button>

            <button
              type="button"
              className={`uppercase w-full  rounded-sm py-2 px-7 font-medium text-sm shadow:md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out && ${
                type === "sale"
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
              id="type"
              value="rent"
              onClick={onChange}
            >
              Rent
            </button>
          </div>

          {/* Name Section */}
          <div className="mt-6">
            <label htmlFor="name" className="text-lg font-semibold mt-6">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="Property Name"
              maxLength={32}
              minLength={10}
              required
              className="w-full px-4 py-2  focus:text-gray-700 focus:bg-white focus:border-slate-600
              text-lg text-gray-700 bg-white border border-gray-300 rounded
              transition duration-150 ease-in-out "
            />
          </div>

          {/* Quantity of Beds/Bath Section */}
          <div className="flex gap-x-6">
            <div className="flex flex-col w-1/4 ">
              <label htmlFor="bedroom" className="text-lg font-semibold mt-6">
                Beds
              </label>
              <input
                type="number"
                id="bedroom"
                value={bedroom}
                onChange={onChange}
                min={1}
                max={50}
                required
                className="py-2 px-4 text-xl text-gray-700 bg-white border border-gray-400 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
              />
            </div>
            <div className="flex flex-col w-1/4">
              <label htmlFor="bedroom" className="text-lg font-semibold mt-6">
                Bath
              </label>
              <input
                type="number"
                id="bathroom"
                value={bathroom}
                onChange={onChange}
                min={1}
                max={50}
                required
                className="py-2 px-4 text-xl text-gray-700 bg-white border border-gray-400 rounded
                transition duration-150 ease-in-out focus:text-gray-700
                 focus:bg-white focus:border-slate-600"
              />
            </div>
          </div>

          {/* parking spot section */}
          <p className="font-semibold text-lg mt-6">Parking Spot</p>
          <div className="flex gap-x-6">
            <button
              type="button"
              className={`uppercase w-full  rounded-sm py-2 px-7 font-medium text-sm shadow:md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out && ${
                !parking ? "bg-white text-black" : "bg-slate-600 text-white"
              }`}
              id="parking"
              value={true}
              onClick={onChange}
            >
              Yes
            </button>

            <button
              type="button"
              className={`uppercase w-full  rounded-sm py-2 px-7 font-medium text-sm shadow:md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out && ${
                parking ? "bg-white text-black" : "bg-slate-600 text-white"
              }`}
              id="parking"
              value={false}
              onClick={onChange}
            >
              No
            </button>
          </div>

          {/* furnished section */}
          <p className="font-semibold text-lg mt-6">Furnished</p>
          <div className="flex gap-x-6">
            <button
              type="button"
              className={`uppercase w-full  rounded-sm py-2 px-7 font-medium text-sm shadow:md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out && ${
                !furnished ? "bg-white text-black" : "bg-slate-600 text-white"
              }`}
              id="furnished"
              value={true}
              onClick={onChange}
            >
              Yes
            </button>

            <button
              type="button"
              className={`uppercase w-full  rounded-sm py-2 px-7 font-medium text-sm shadow:md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out && ${
                furnished ? "bg-white text-black" : "bg-slate-600 text-white"
              }`}
              id="furnished"
              value={false}
              onClick={onChange}
            >
              No
            </button>
          </div>

          {/* Address Section */}
          <div className="mt-6">
            <label htmlFor="address" className="text-lg font-semibold mt-6">
              Address
            </label>
            <textarea
              type="text"
              id="address"
              value={address}
              onChange={onChange}
              placeholder="Address"
              required
              className="w-full px-4 py-2  text-lg text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out "
            />
          </div>

          {
            !geolocationEnabled && (
              <div className="flex gap-x-6">
                <div className="flex flex-col w-1/4 ">
                  <label
                    htmlFor="latitude"
                    className="text-lg font-semibold mt-6"
                  >
                    Latitude
                  </label>
                  <input
                    type="number"
                    id="latitude"
                    value={latitude}
                    onChange={onChange}
                    min={-90}
                    max={50}
                    required
                    className="py-2 px-4 text-xl text-gray-700 bg-white border border-gray-400 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
                  />
                </div>
                <div className="flex flex-col w-1/4">
                  <label
                    htmlFor="longitude"
                    className="text-lg font-semibold mt-6"
                  >
                    Longitude
                  </label>
                  <input
                    type="number"
                    id="longitude"
                    value={longitude}
                    onChange={onChange}
                    min={-180}
                    max={180}
                    required
                    className="py-2 px-4 text-xl text-gray-700 bg-white border border-gray-400 rounded
                transition duration-150 ease-in-out focus:text-gray-700
                 focus:bg-white focus:border-slate-600"
                  />
                </div>
              </div>
            )
          }

          {/* description Section */}
          <div className="mt-6">
            <label htmlFor="description" className="text-lg font-semibold mt-6">
              Description
            </label>
            <textarea
              type="text"
              id="description"
              value={description}
              onChange={onChange}
              placeholder="Property description"
              required
              className="w-full px-4 py-2  text-lg text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out "
            />
          </div>

          {/* offer section */}
          <p className="font-semibold text-lg mt-6">Offer</p>
          <div className="flex gap-x-6">
            <button
              type="button"
              className={`uppercase w-full  rounded-sm py-2 px-7 font-medium text-sm shadow:md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out && ${
                !offer ? "bg-white text-black" : "bg-slate-600 text-white"
              }`}
              id="offer"
              value={true}
              onClick={onChange}
            >
              Yes
            </button>

            <button
              type="button"
              className={`uppercase w-full  rounded-sm py-2 px-7 font-medium text-sm shadow:md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out && ${
                offer ? "bg-white text-black" : "bg-slate-600 text-white"
              }`}
              id="offer"
              value={false}
              onClick={onChange}
            >
              No
            </button>
          </div>

          {/* Property Price*/}

          {/* Regular */}

          <div className="mt-6">
            <label htmlFor="regular" className="text-lg font-semibold ">
              Regular Price
            </label>
            <div className="flex  gap-x-6 items-center">
              <input
                type="number"
                id="regular"
                value={regular}
                onChange={onChange}
                min={50}
                max={50000000}
                required
                className="w-1/3 py-2 px-4 text-xl text-center text-gray-700 bg-white border border-gray-400 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
              />
              {type === "rent" ? <p>$ / Month</p> : <p>$</p>}
            </div>
          </div>

          {/* Discount */}

          {offer && (
            <div className="mt-6">
              <label htmlFor="discount" className="text-lg font-semibold ">
                Discount Price
              </label>
              <div className="flex  gap-x-6 items-center">
                <input
                  type="number"
                  id="discount"
                  value={discount}
                  onChange={onChange}
                  min={50}
                  max={5000000000}
                  required
                  className="w-1/3 py-2 px-4 text-xl text-center text-gray-700 bg-white border border-gray-400 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
                />
                {type === "rent" ? <p>$ / Month</p> : <p>$</p>}
              </div>
            </div>
          )}

          {/* Images Section */}
          <div className="mt-6 ">
            <label htmlFor="image" className="text-lg font-semibold mt-6">
              Images
            </label>
            <p className="text-sm text-gray-500 mt-1">
              The first image will be the cover (max 6)
            </p>
            <input
              type="file"
              id="image"
              onChange={onChange}
              placeholder="The first image will be the cover (max 6)"
              required
              accept=".jpeg, .png, .jpg"
              multiple
              className="w-full px-4 py-2 mb-6 focus:text-gray-700
               focus:bg-white focus:border-slate-500 text-lg
               text-gray-700 bg-white border border-gray-300
               rounded transition duration-150 ease-in-out "
            />
          </div>

          <button
            type="submit"
            className=" mt-6 bg-blue-600 w-full text-center px-6 py-2
            rounded-md uppercase text-white hover:bg-blue-700 transition
             duration-200 ease-in-out  cursor-pointer shadow-md hover:shadow-large active:bg-blue-800"
          >
            Edit Listing
          </button>
        </form>
      </div>
    </section>
  );
}

export default EditListing
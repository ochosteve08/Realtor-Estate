import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import Spinner from "../Components/Spinner";
import { MdLocationOn } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import { FaShare } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { FaParking } from "react-icons/fa";
import { FaChair } from "react-icons/fa";
import LandlordContact from "../Components/LandlordContact";
import { MapContainer } from "react-leaflet";
import { TileLayer } from "react-leaflet";
import { Marker } from "react-leaflet";
import { Popup } from "react-leaflet";

const Listing = () => {
  const [contactLandlord, setContactLandlord] = useState(false);
  const [listing, setListing] = useState();
  const [loading, setLoading] = useState(false);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const { listingId } = useParams();

  SwiperCore.use([Autoplay, Navigation, Pagination]);

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      const docRef = doc(db, "listings", listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
        console.log(listing);
      }
    };
    fetchListing();
  }, [listingId]);

  if (loading) {
    return <Spinner />;
  }

  const latitude = parseFloat(listing?.geoLocation.lat);
  const longitude = parseFloat(listing?.geoLocation.lng);

  // Create a LatLng object from the float values
  const position = [latitude, longitude];

  return (
    <main>
      {listing && (
        <>
          <Swiper
            slidesPerView={1}
            navigation
            pagination={{ type: "progressbar" }}
            effect="fade"
            modules={[EffectFade]}
            autoplay={{ delay: 3000 }}
          >
            {listing?.imageUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <div
                  className="relative w-full overflow-hidden h-[350px]  "
                  style={{
                    background: `url(${listing.imageUrls[index]}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                >
                  {null}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className="fixed top-[15%] right-[5%] z-50 bg-white p-4 rounded-full cursor-pointer border-2 border-gray-400 "
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setShareLinkCopied(true);
              setTimeout(() => {
                setShareLinkCopied(false);
              }, 2000);
            }}
          >
            <FaShare className="text-lg text-slate-500" />
          </div>
          {shareLinkCopied && (
            <div className="fixed top-[28%] right-[10%] z-50 bg-white px-4 py-2 rounded-full font-semibold border-2 border-gray-400 ">
              Link Copied!
            </div>
          )}
          <div className="bg-white flex  items-center justify-center my-6 space-x-3  py-3 ">
            {listing?.imageUrls.map((image, index) => (
              <img
                className="w-[50px] h-[40px]   lg:w-[5%] lg:h-[60px] rounded-sm shadow-lg  "
                key={index}
                src={image}
                loading="lazy"
              />
            ))}
          </div>
          <div className=" bg-white  flex flex-col md:flex-row mx-4 p-4 md:max-w-6xl   lg:mx-auto   shadow-lg space-y-5 md:space-x-5 md:space-y-0 rounded-lg ">
            <div className="h-auto  w-full ">
              <h3 className=" text-2xl font-bold  text-blue-900 ">
                {listing?.name} - ₦
                {listing?.regular
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                {listing?.type === "rent" ? "/year" : ""}
              </h3>
              <div className="flex items-center space-x-2 mt-4 mb-3 font-semibold">
                <MdLocationOn className="h-6 w-6 text-green-600" />
                <p className=" text-gray-600 text-lg truncate">
                  {listing?.address}
                </p>
              </div>
              <div className="flex space-x-4 justify-start text-white items-center font-semibold md:w-[75%]">
                <p className="bg-red-500 w-full max-w-[200px] text-center  p-1 rounded-md shadow-md">
                  {listing?.type === "rent" ? "For Rent" : "For Sale"}
                </p>
                {listing?.offer && (
                  <p className="bg-green-600 w-full max-w-[200px] text-center p-1 rounded-md shadow-md">
                    discount: ₦{listing?.discount}
                  </p>
                )}
              </div>
              <p className="mt-4 mb-4">
                <span className="font-bold">Description : </span>
                {listing?.description}
              </p>

              <div className="flex lg:flex-row  items-center gap-2 font-semibold flex-wrap md:gap-4   ">
                <div className="flex flex-1 items-center space-x-2  whitespace-nowrap">
                  <FaBed />
                  <p>
                    {listing?.bedroom > 1
                      ? `${listing?.bedroom} Beds`
                      : "1 Bed"}
                  </p>
                </div>

                <div className="flex flex-1 items-center space-x-2  whitespace-nowrap">
                  <FaBath />
                  <p>
                    {listing?.bathroom > 1
                      ? `${listing?.bathroom} Baths`
                      : "1 Bath"}
                  </p>
                </div>

                <div className="flex flex-1 items-center space-x-2  whitespace-nowrap">
                  <FaParking />
                  <p>{listing?.parking ? "Parking Spot" : "No Parking"}</p>
                </div>
                <div className="flex flex-1 items-center space-x-2  whitespace-nowrap">
                  <FaChair />
                  <p>{listing?.furnished ? "Furnished" : "Not Furnished"} </p>
                </div>
              </div>

              <div className="mt-6 ">
                {listing?.userRef !== auth.currentUser?.uid &&
                  !contactLandlord && (
                    <button
                      className="bg-blue-600 w-full text-center py-2  rounded shadow-md hover:shadow-lg focus:shadow-lg hover:bg-blue-700 focus:bg-blue-700 text-white uppercase font-medium transition duration-150 ease-in-out"
                      onClick={() =>
                        setContactLandlord((prevState) => !prevState)
                      }
                    >
                      contact landlord
                    </button>
                  )}
                {contactLandlord && <LandlordContact listing={listing} />}
              </div>
            </div>
            <div className=" h-[200px] md:h-[auto]  w-full  overflow-x-hidden ">
              <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup>{listing.address}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Listing;

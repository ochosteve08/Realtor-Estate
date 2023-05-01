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
import {FaShare} from "react-icons/fa";
import {FaBed} from "react-icons/fa";
import {FaBath} from "react-icons/fa";
import {FaParking} from "react-icons/fa";
import {FaChair} from "react-icons/fa"

const Listing = () => {
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
       }
      
    };
    fetchListing();
  }, []);

  if (loading) {
    return <Spinner />;
  };

  console.log(listing?.imageUrls[0]);

  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={EffectFade}
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
        className="fixed top-[20%] right-[5%] z-50 bg-white p-4 rounded-full cursor-pointer border-2 border-gray-400 "
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
        <div className="fixed top-[30%] right-[10%] z-50 bg-white px-4 py-2 rounded-full font-semibold border-2 border-gray-400 ">
          Link Copied!
        </div>
      )}
      <div className="bg-white flex  items-center justify-center my-6 space-x-3  py-3 ">
        {listing?.imageUrls.map((image, index) => (
          <img
            className="w-[15%] rounded-sm shadow-lg"
            key={index}
            src={image}
            loading="lazy"
          />
        ))}
      </div>
      <div className=" bg-white md:max-w-6xl   mx-auto flex flex-col md:flex-row p-4 shadow-lg space-y-5 md:space-x-5 md:space-y-0 ">
        <div className="h-[200px] lg:h-[400px] w-full ">
          <h3 className=" text-2xl font-bold  text-blue-900 ">
            {listing?.name} - $
            {listing?.regular.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing?.type === "rent" ? "/month" : ""}
          </h3>
          <div className="flex items-center space-x-2 mt-4 mb-3 font-semibold">
            <MdLocationOn className="h-6 w-6 text-green-600" />
            <p className=" text-gray-600 text-lg truncate">
              {listing?.address}
            </p>
          </div>
          <div className="flex space-x-6 text-white items-center font-semibold">
            <p className="bg-red-500 px-16 py-1 rounded-md shadow-md">
              {listing?.type === "rent" ? "For Rent" : "For Sale"}
            </p>
            {listing?.offer && (
              <p className="bg-green-600  px-10 py-1 rounded-md shadow-md">
                ${listing?.discount} discount
              </p>
            )}
          </div>
          <p className="mt-4 mb-4">
            <span className="font-semibold">Description </span>-
            {listing?.description}
          </p>

          <div className="flex items-center space-x-6 font-bold  whitespace-nowrap ">
            <div className="flex items-center space-x-2 ">
              <FaBed />
              <p>
                {listing?.bedroom > 1 ? `${listing?.bedroom} Beds` : "1 Bed"}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <FaBath />
              <p>
                {listing?.bathroom > 1
                  ? `${listing?.bathroom} Baths`
                  : "1 Bath"}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <FaParking />
              <p>{listing?.parking ? "Parking Spot" : "No Parking"}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaChair/>
              <p>{listing?.furnished ? "Furnished" : "Not Furnished"} </p>
            </div>
          </div>
        </div>
        <div className="bg-blue-300 h-[200px] lg:h-[400px] w-full z-50 overflow-x-hidden "></div>
      </div>
    </main>
  );
};

export default Listing;

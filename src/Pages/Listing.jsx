import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import Spinner from "../Components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import {FaShare} from "react-icons/fa"

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
  }

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
              className="relative w-full overflow-hidden h-[500px]"
              style={{
                background: `url(${listing.imageUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
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
    </main>
  );
};

export default Listing;

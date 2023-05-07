import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import Spinner from "./Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import { useNavigate } from "react-router";

const Slider = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const listingRef = collection(db, "listings");
      const q = query(listingRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);

      let listing = [];
      querySnap.forEach((doc) => {
        return listing.push({ data: doc.data(), id: doc.id });
      });

      if (listing) {
        setListings(listing);
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  if (listings.length === 0) {
    return <></>;
  }

  return (
    <div>
      {listings && (
        <>
          <Swiper

            slidesPerView={1}
            navigation
            pagination={{clickable: true}}
            effect="fade"
            modules={[EffectFade]}
            autoplay={{ delay: 3000 }}
          >
            {listings.map(({ data, id }) => (
              <SwiperSlide
                key={id}
                onClick={() => navigate(`/category/${data.type}/${id}`)}
                //
              >
                <div
                  className="relative w-full overflow-hidden h-[300px] cursor-pointer  "
                  style={{
                    background: `url(${data.imageUrls[0]}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>

                <p className="absolute left-2 top-3 z-50  bg-[#0077b6] px-6 py-2 rounded rounded-br-full text-white text-xs uppercase font-semibold shadow-lg">
                  {data.name}
                </p>
                <p
                  className={`absolute right-2  top-[5%]  px-6 py-2 rounded-bl-full z-50 text-white text-xs uppercase font-semibold  ${
                    data.type === "rent" ? " bg-[#d90429]" : " bg-green-600"
                  }`}
                >
                  {data.type}
                </p>
                <p className=" bg-[#d90429] absolute left-2  bottom-[5%]  px-6 py-2 rounded-tr-full z-50 text-white text-xs uppercase font-semibold">
                  ₦
                  {data.regular
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  {data.type === "rent" && " /year"}
                </p>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
};

export default Slider;

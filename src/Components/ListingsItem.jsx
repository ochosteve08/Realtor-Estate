import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdPhotoCamera } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";

const ListingsItem = ({ id, listing, onEdit, onDelete }) => {
  const date = new Date(listing.timestamp.toDate());
  SwiperCore.use([Autoplay, Navigation, Pagination]);

  return (
    <li className="bg-white relative flex w-auto flex-col justify-between items-center shadow-md hover:shadow-lg rounded-lg my-4 sm:mx-4  overflow-hidden transition-shadow duration-150   ">
      <Link className="contents" to={`/category/${listing.type}/${id}`}>
        <Swiper
          slidesPerView={1}
          // navigation
          // pagination={{ type: "progressbar" }}
          // effect="fade"
          // modules={[EffectFade]}
          autoplay={{ delay: 3000 }}
        >
          {listing.imageUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <img
                className=" overflow-hidden w-[450px] xs:w-[620px]   sm:w-[600px]  h-[170px] object-cover  hover:scale-105 transition-scale duration-150 ease-in-out "
                src={url}
                alt="pics"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute left-2 top-2 z-40  bg-[#0077b6]  rounded-md  px-4 py-2  rounded-br-full rounded-tl-full text-white text-xs uppercase font-semibold">
          {moment(date).fromNow()}
        </div>
        <div className="w-full p-[10px]">
          <div className="flex items-center space-x-2">
            <MdLocationOn className="h-4 w-4 text-green-600" />
            <p className="font-semibold text-sm text-gray-600 mb-[2px] truncate">
              {listing.address}
            </p>
          </div>
          <p
            className={`absolute left-2 z-40 top-[49%]  px-3 py-1 rounded rounded-bl-full rounded-tr-full text-white text-xs uppercase font-semibold  ${
              listing.type === "rent" ? " bg-[#d90429]" : " bg-green-600"
            }`}
          >
            {listing.type}
          </p>
          <div className="flex absolute z-40 bg-white right-2 top-[50%] items-center rounded-sm px-1">
            <MdPhotoCamera className="" />
            <p className="text-sm">{listing.imageUrls.length}</p>
          </div>
          <p className="font-semibold  text-xl">{listing.name}</p>
          <div className="flex space-x-3 text-[#0096c7] my-1 font-semibold">
            <p>
              ₦
              {listing.regular.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              {listing.type === "rent" && " /year"}
            </p>
            {/* {listing.offer && (
              <p>
                <span className="font-semibold text-black bg-green-300 px-1 py-[2px] rounded-md mr-1">
                  discount:
                </span>
                ₦
                {listing.discount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
            )} */}
          </div>
          <div className="flex items-center space-x-3 font-bold text-xs ">
            <div>
              <p>{listing.bedroom > 1 ? `${listing.bedroom} Beds` : "1 Bed"}</p>
            </div>

            <div>
              <p>
                {listing.bathroom > 1 ? `${listing.bathroom} Baths` : "1 Bath"}
              </p>
            </div>
          </div>
        </div>
      </Link>
      {onEdit && (
        <MdEdit
          className="absolute text-black bottom-2 right-9 h-4 cursor-pointer"
          onClick={() => onEdit(listing.id)}
        />
      )}

      {onDelete && (
        <FaTrash
          className="absolute text-red-500 bottom-2 right-2 h-4 cursor-pointer"
          onClick={() => onDelete(listing.id)}
        />
      )}
    </li>
  );
};

export default ListingsItem;

import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import {FaTrash} from "react-icons/fa";
import {MdEdit} from "react-icons/md"

const ListingsItem = ({ id, listing, onEdit, onDelete }) => {
  const date = new Date(listing.timestamp.toDate());
 
  return (
    <li className="bg-white relative flex flex-col justify-between items-center shadow-md hover:shadow-lg rounded-lg my-6 overflow-hidden transition-shadow duration-150  mx-4">
      <Link className="contents" to={`/category/${listing.type}/${id}`}>
        <img
          className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-150 ease-in-out"
          src={listing.imageUrls[0]}
          loading="lazy"
          alt=""
        />
        <div className="absolute left-2 top-2  bg-[#0077b6] px-2 py-1 rounded-md text-white text-xs uppercase font-semibold">
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
            className={`absolute left-2 top-[50%]  px-2 py-1 rounded-md text-white text-xs uppercase font-semibold  ${listing.type === "rent"? " bg-[#d90429]": " bg-green-600"}`}
          >
            {listing.type}
          </p>
          <p className="font-semibold  text-xl">{listing.name}</p>
          <div className="flex space-x-3 text-[#0096c7] my-2 font-semibold">
            <p>
              $
              {listing.regular.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              {listing.type === "rent" && " /month"}
            </p>
            {listing.offer && (
              <p>
                <span className="font-semibold text-black bg-green-400 px-2 py-[2px] rounded-sm">
                  discount:
                </span>
                $
                {listing.discount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
            )}
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
          className="absolute text-black bottom-2 right-7 h-4 cursor-pointer"
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

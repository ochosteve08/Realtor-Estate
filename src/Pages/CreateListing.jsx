import React from "react";
import { useState } from "react";

const CreateListing = () => {
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
    discount: 0
  });

  const { type, name, bedroom, bathroom , parking, furnished, address, description, offer, regular, discount} = formData;

  const [sale, setSale] = useState();

  const onChange = () => {};
  return (
    <section className="max-w-lg mx-auto px-2">
      <h1 className=" text-3xl text-center font-bold mt-6">Create a Listing</h1>

      <div className=" w-full   my-6 px-3 ">
        <form>
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
              value={sale}
              onChange={onChange}
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
              value={sale}
              onChange={onChange}
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
            <div className="flex flex-col w">
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
            <div className="flex flex-col w">
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
              onChange={onChange}
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
              onChange={onChange}
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
              onChange={onChange}
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
              onChange={onChange}
            >
              No
            </button>
          </div>

          {/* Address Section */}
          <div className="mt-6">
            <label htmlFor="address" className="text-lg font-semibold mt-6">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={onChange}
              placeholder="Address"
              required
              className="w-full px-4 py-2  text-lg text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out "
            />
          </div>

          {/* description Section */}
          <div className="mt-6">
            <label htmlFor="description" className="text-lg font-semibold mt-6">
              Description
            </label>
            <input
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
              onChange={onChange}
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
              onChange={onChange}
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
              // value={photo}
              onChange={onChange}
              placeholder="The first image will be the cover (max 6)"
              required
              accept=".jpeg, .png, .jpg"
              multiple
              className="w-full px-4 py-2 mb-6 focus:text-gray-700 focus:bg-white focus:border-slate-600 
              text-lg text-gray-700 bg-white border border-gray-300 rounded 
              transition duration-150 ease-in-out "
            />
          </div>

          <button
            type="submit"
            className=" mt-6 bg-blue-600 w-full text-center px-6 py-2 rounded-md uppercase text-white hover:bg-blue-700 transition duration-200 ease-in-out  cursor-pointer shadow-md hover:shadow-large active:bg-blue-800"
          >
            
            Create Listing
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateListing;

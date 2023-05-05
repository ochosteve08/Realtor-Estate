import React from 'react';
import { Link } from "react-router-dom";

import ListingsItem from "../Components/ListingsItem";

const HomePageListing = ({listings}) => {
  return (
    <>
      <div>
        <h2 className="font-semibold text-2xl mt-6">Recent Offers</h2>
        <Link to="/offers">
          <p className=" text-blue-600 hover:text-blue-700 focus:text-blue-700 transition delay-150 ease-in-out">
            Show more offers
          </p>
        </Link>

       {listings && <ul className="grid  sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">
          {listings.map((offer) => (
            <ListingsItem key={offer.id} listing={offer.data} id={offer.id} />
          ))}
        </ul>}
      </div>
    </>
  );
}

export default HomePageListing
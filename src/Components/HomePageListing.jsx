import React from 'react';
import { Link } from "react-router-dom";

import ListingsItem from "../Components/ListingsItem";

const HomePageListing = ({listings,title}) => {
    console.log(listings)
  return (
    <>
      <div>
        <h2 className="font-semibold text-2xl mt-6">{title}</h2>
        <Link to="/offers">
          <p className=" text-blue-600 hover:text-blue-700 focus:text-blue-700 transition delay-150 ease-in-out">
            Show more offers
          </p>
        </Link>

        {listings && (
          <ul className="grid  sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">
            {/* {listings.map(({ data, id }) => (
              <ListingsItem key={id} listing={data} id={id} />
            ))} */}
            {listings.map((listing) => (
              <ListingsItem
                key={listing.id}
                listing={listing.data}
                id={listing.id}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default HomePageListing
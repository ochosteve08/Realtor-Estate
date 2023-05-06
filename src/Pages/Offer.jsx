import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import ListingsItem from "../Components/ListingsItem";

const Offer = () => {
  const [offerListings, setOfferListings] = useState(null);

  // for offers
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listingsRef = collection(db, "listings");
        // create the query
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc")
        );
        const querySnap = await getDocs(q);
        let listing = [];
        querySnap.forEach((doc) => {
          return listing.push({ id: doc.id, data: doc.data() });
        });

        setOfferListings(listing);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListing();
  }, []);

  return (
    <section className=" max-w-6xl mx-auto px-3 mt-4">
      <h1 className=" text-3xl text-center font-bold my-6">Offers</h1>
      <ul className="grid  sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">
        {offerListings && offerListings.map((listing) => (
          <ListingsItem
            key={listing.id}
            id={listing.id}
            listing={listing.data}
          
          />
        ))}
      </ul>
    </section>
  );
};

export default Offer;

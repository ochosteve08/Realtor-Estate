import React, { useEffect, useState } from "react";
import Spinner from "../Components/Spinner";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import ListingsItem from "../Components/ListingsItem";
import { toast } from "react-toastify";

const Offer = () => {
  const [offerListings, setOfferListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchListing, setLastFetchListing] = useState(null);

  // for offers
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listingsRef = collection(db, "listings");
        // create the query
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchListing(lastVisible);
        // console.log(lastVisible);

        let listing = [];
        querySnap.forEach((doc) => {
          return listing.push({ id: doc.id, data: doc.data() });
        });

        setOfferListings(listing);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("couldn't fetch listings");
        setLoading(false);
      }
    };
    fetchListing();
  }, []);

const fetchMoreListing =async()=>{
   try {
     const listingsRef = collection(db, "listings");
     // create the query
     const q = query(
       listingsRef,
       where("offer", "==", true),
       orderBy("timestamp", "desc"),
       limit(2),
       startAfter(lastFetchListing)
     );
     const querySnap = await getDocs(q);
     const lastVisible = querySnap.docs[querySnap.docs.length - 1];
     setLastFetchListing(lastVisible);
     // console.log(lastVisible);

     let listing = [];
     querySnap.forEach((doc) => {
       return listing.push({ id: doc.id, data: doc.data() });
     });

     setOfferListings((prevState)=> [...prevState,...listing]);
     setLoading(false);
   } catch (error) {
     console.log(error);
     toast.error("couldn't fetch listings");
     setLoading(false);
   }

}

  if (loading) {
    return <Spinner />;
  }
  return (
    <section className=" max-w-6xl mx-auto px-3 mt-4 mb-6">
      <h1 className=" text-3xl text-center font-bold my-6 uppercase">Offers</h1>
      <ul className="grid  sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 mx-1 ">
        {offerListings &&
          offerListings.map((listing) => (
            <ListingsItem
              key={listing.id}
              id={listing.id}
              listing={listing.data}
            />
          ))}
      </ul>
      {lastFetchListing && (
        <div className="text-center">
          <button onClick={fetchMoreListing} className=" bg-blue-600 hover:bg-blue-800  py-1 px-2 my-6 text-[#c7ebdf] hover:text-white rounded font-medium shadow-lg transition duration-150 ease-in-out">
            LOAD MORE
          </button>
        </div>
      )}
    </section>
  );
};

export default Offer;

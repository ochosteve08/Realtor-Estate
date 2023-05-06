// import React, { useEffect, useState } from "react";
// import Slider from "../Components/Slider";
// import Spinner from '../Components/Spinner'
// import {
//   collection,
//   getDocs,
//   limit,
//   orderBy,
//   query,
//   where,
// } from "firebase/firestore";
// import { auth, db } from "../firebase";

// import HomePageListing from "../Components/HomePageListing";

// const Home = () => {
//   const [offerListings, setOfferListings] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchListing = async () => {
//       try {
//         const listingsRef = collection(db, "listings");
//         // create the query
//         const q = query(
//           listingsRef,
//           where("offer", "==", true),
//           orderBy("timestamp", "desc"),
//           limit(4)
//         );
//         const querySnap = await getDocs(q);
//         console.log(querySnap);

//         let listing = [];
//         querySnap.forEach((doc) => {
//           return listing.push({ id: doc.id, data: doc.data() });
//         });
//         console.log(listing);
//         setOfferListings(listing);
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchListing();
//   }, []);

//   if (loading) {
//     return <Spinner />;
//   }

//   return (
//     <main>
//       <Slider />
//       <div className="max-w-6xl space-y-6  mx-auto px-4 ">
//         <div>
//           {offerListings && offerListings.length > 0 && (
//             <HomePageListing title={"Recent Offers"} listings={offerListings} />
//           )}
//         </div>
//       </div>
//     </main>
//   );
// };
// export default Home;



import {
  collection,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ListingsItem from "../Components/ListingsItem";
import Slider from "../Components/Slider";
import { db } from "../firebase";

export default function Home() {
  // Offers
  const [offerListings, setOfferListings] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        // get reference
        const listingsRef = collection(db, "listings");
        // create the query
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
      
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);


  return (
    <div>
      <Slider />
      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {offerListings && offerListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">Recent offers</h2>
            <Link to="/offers">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more offers
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {offerListings.map((listing) => (
                <ListingsItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
    
      </div>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import Slider from "../Components/Slider";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

import HomePageListing from "../Components/HomePageListing";

const Home = () => {
  const [offerListings, setOfferListings] = useState(null);
  const [rentListings, setRentListings] = useState(null);
  const [saleListings, setSaleListings] = useState(null);

  const home = {
    offer: {
      title: "Recent Offers",
      wordLink: "Show more offers",
      link: "/offers",
    },
    rent: {
      title: "Places for rent",
      wordLink: "Show more places for rent",
      link: "/category/rent",
    },
    sale: {
      title: "Places for sale",
      wordLink: "Show more places for sale",
      link: "/category/sale",
    },
  };

  const { offer, rent, sale } = home;

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

  //for rent
  useEffect(() => {
    const fetchRentListing = async () => {
      try {
        const listingsRef = collection(db, "listings");
        // create the query
        const q = query(
          listingsRef,
          where("type", "==", "rent"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        console.log(querySnap);
        let listing = [];
        querySnap.forEach((doc) => {
          return listing.push({ id: doc.id, data: doc.data() });
        });
        if (listing && listing.length > 0) {
          setRentListings(listing);
          console.log(listing);
         
        }
         console.log(rentListings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRentListing();
  }, []);

  //for sale
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listingsRef = collection(db, "listings");
        // create the query
        const q = query(
          listingsRef,
          where("type", "==", "sale"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        let listing = [];
        querySnap.forEach((doc) => {
          return listing.push({ id: doc.id, data: doc.data() });
        });

        setSaleListings(listing);
        // console.log(listing);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListing();
  }, []);

  return (
    <main>
      <Slider />
      <div className="max-w-6xl space-y-6  mx-auto px-4 ">
        <div>
          {offerListings && offerListings.length > 0 && (
            <HomePageListing
              title={offer.title}
              link={offer.link}
              listings={offerListings}
              wordLink={offer.wordLink}
            />
          )}
          {rentListings && rentListings.length > 0 && (
            <HomePageListing
              title={rent.title}
              link={rent.link}
              listings={rentListings}
              wordLink={rent.wordLink}
            />
          )}
          {offerListings && offerListings.length > 0 && (
            <HomePageListing
              title={sale.title}
              link={sale.link}
              listings={saleListings}
              wordLink={sale.wordLink}
            />
          )}
        </div>
      </div>
    </main>
  );
};
export default Home;

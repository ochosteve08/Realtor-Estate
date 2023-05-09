import React from "react";
import spinner from "../assets/spinner.svg";
const Spinner = () => {
  return (
    <div className="bg-black bg-opacity-30 flex  justify-center items-center z-50 fixed top-0 bottom-0 left-0 right-0">
      <img className="w-[100px]" src={spinner} alt="loading.... "  />
    </div>
  );
};

export default Spinner;

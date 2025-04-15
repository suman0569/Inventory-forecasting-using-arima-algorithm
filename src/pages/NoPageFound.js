import React from "react";
import notFoundImage from "../assets/pagenotfound.jpg"; // Import your 404 error image

function NoPageFound() {
  return (
    <div className="grid h-screen px-4 bg-white place-content-center">
      <div className="text-center">
        {/* Image for 404 error */}
        <img
          src={notFoundImage}
          alt="404 Not Found"
          className="w-auto h-64 mx-auto mb-6" // You can adjust the size as needed
        />

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh! 404 Error
        </h1>

        <p className="mt-4 text-gray-500">We can't find that page.</p>
      </div>
    </div>
  );
}

export default NoPageFound;

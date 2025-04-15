import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideMenu from "./SideMenu";
import Footer from "./Footer"; // Import Footer component

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <div className="md:h-16">
        <Header />
      </div>

      {/* Main Content and Sidebar */}
      <div className="flex flex-grow">
        {/* Sidebar (SideMenu) - visible on large screens */}
        <div className="col-span-2 h-screen sticky top-0 hidden lg:block">
          <SideMenu />
        </div>

        {/* Main Content - Outlet */}
        <div className="flex-grow p-4">
          <Outlet />
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default Layout;

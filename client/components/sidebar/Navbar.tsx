import React from "react";
import NavDropDown from "./NavDropDown";
import NavHeader from "./NavHeader";


export default function Navbar() {
  return (
    <div className="bg-[#202c33] h-16 flex w-full items-center px-4 justify-between">
      <>
      <NavHeader />
      <NavDropDown />
      </>
    </div>
  );
}
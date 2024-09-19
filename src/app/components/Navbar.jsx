import React from "react";

const Navbar = () => {
  return (
    <div
      className="flex justify-between w-full  h-[8%]"
      style={{ backgroundColor: "#6C4E31", color: "#FFF8E8" }}
    >
      <div className="flex justify-start pl-[10%] items-center border border-black w-[60%]">
        BeamMeet
      </div>
      <div className="flex justify-center items-center border border-black w-[10%]">
        products
      </div>
      <div className="flex justify-center items-center border border-black w-[10%]">
        solutions
      </div>
      <div className="flex justify-center items-center border border-black w-[10%]">
        resources
      </div>
      <div className="flex justify-center items-center border border-black w-[10%]">
        Logout
      </div>
    </div>
  );
};

export default Navbar;

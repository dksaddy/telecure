import React from "react";
import "../login.css";
const layout = ({ children }) => {
  return (
    <div className="h-screen w-screen login-bg grid grid-cols-3">
      <img
        src="../logos/default.png"
        alt=""
        className="absolute right-10 top-10 h-[40px]"
      />

      {children}
    </div>
  );
};

export default layout;

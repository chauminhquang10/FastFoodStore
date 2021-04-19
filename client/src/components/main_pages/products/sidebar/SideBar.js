import React from "react";
import "./SideBar.css";

const SideBar = () => {
  return (
    <>
      <ul className="sidebar">
        <li className="favor">
          <button className=" btn-favor">FAVORITES</button>
          <i class="fas fa-fire sidebar-icon"></i>
        </li>
        <li>
          <button className="btn-sidebar">DAILY DEAL</button>
        </li>
        <li>
          <button className="btn-sidebar">NEW</button>
        </li>
        <li>
          <button className="btn-sidebar">WHOPPER</button>
        </li>
        <li>
          <button className="btn-sidebar">HAPPY SNACKS</button>
        </li>
        <li>
          <button className="btn-sidebar">FRIED CHICKEN</button>
        </li>
      </ul>
    </>
  );
};

export default SideBar;

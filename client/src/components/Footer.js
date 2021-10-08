import React from "react";
// import { Link } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="p-5 bg-dark text-white text-center position-relative fixed-bottom">
      <div className="container">
        <p className="lead">Copyright &copy; 2021 Hackathon Team-2</p>
        {/* <Link to="/" ></Link> */}
        <div className="position-absolute bottom-0 end-0 p-5"><FaArrowUp  size="3rem"  color="" /></div>
      </div>
    </footer>
  );
}

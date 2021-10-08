import React from "react";
import { FaArrowUp } from "react-icons/fa";
export default function Footer() {
  const buttonClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <footer className="p-5 bg-dark text-white text-center position-relative fixed-bottom border ">
      <div className="container">
        <p className="lead">Copyright &copy; 2021 Hackathon Team-2</p>
        <button onClick={buttonClick} className="btn btn-dark mb-3 position-absolute bottom-0 end-0 "><FaArrowUp  size="2rem"  color="" /></button>
      </div>
    </footer>
  );
}

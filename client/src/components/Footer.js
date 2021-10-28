import React from "react";
import { FaArrowUp } from "react-icons/fa";
export default function Footer() {
  const buttonClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <footer className="p-5 text-dark text-center position-relative fixed-bottom footerbg">
      <div className="container">
        <p className="lead">Copyright &copy; 2021 Hackathon Team-2</p>
        <FaArrowUp size="4rem" color="grey" onClick={buttonClick} className="btn  mb-3 position-absolute bottom-0 end-0 " aria-labelledby="labeldiv" />
      </div>
    </footer>
  );
}

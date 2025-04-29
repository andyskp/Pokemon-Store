import { Link } from "react-router-dom";
import images from "../assets/images";
import { useState } from "react";
import "../Sass/Header.scss";

const Header = () => {
  const [menuOpen, setMenuOpe] = useState(false);
  const toggleMenu = () => {
    setMenuOpe(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpe(false);
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <img src={images.logo} className="logo" />
      </Link>
      <button onClick={toggleMenu} className="toggle-button" type="button">
        ☰
      </button>
      <ul className="options">
        <li>
          <Link className="link" onClick={closeMenu} to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="link" onAbort={closeMenu} to="/about">
            About
          </Link>
        </li>
        <li>
          <Link className="link" onClick={closeMenu} to="/products">
            Products
          </Link>
        </li>
      </ul>
      <div className="button-cont">
        <p>
          <Link className="button-us" onClick={closeMenu} to="/contact">
            Contact us
          </Link>
        </p>
      </div>
    </nav>
  );
};
export default Header;

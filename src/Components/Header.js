import React from "react";
import "./Header.css";
import { useAppContext } from "./Appcontext";
import { Link } from "react-router-dom"

function Header() {
  const{searchTerm, setSearchTerm,cart } = useAppContext()
  return (
    <div className="header">
      <img
        className="header__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo"
      />
      <Link to="/car" className="header__cartButton">
        Cart ({cart.length})
      </Link>
      <input
        type="text"
        className="header__search"
        placeholder="....."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
    </div>
  );
}

export default Header;

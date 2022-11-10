import React from "react";
import "./Navigation.css";
import { useNavigate } from "react-router-dom";

function Navigation({ loggedIn, isMainPage, isActive, children, setIsActive }) {
  const navigate = useNavigate();
  function handleClick(path) {
    navigate(path);
    setIsActive(false);
  }
  return (
    <nav
      className={`navigation ${!isMainPage && "navigation_color_black"} ${
        isActive && "navigation_opened"
      }`}
    >
      <button
        onClick={() => handleClick("/")}
        type="button"
        className={`navigation__button ${
          isMainPage
            ? "navigation__button_color_white"
            : "navigation__button_inactive_white"
        }`}
      >
        Home
      </button>
      {loggedIn && (
        <button
          onClick={() => handleClick("/saved-news")}
          type="button"
          className={`navigation__button ${
            !isMainPage
              ? "navigation__button_color_black"
              : "navigation__button_inactive_black"
          }`}
        >
          Saved articles
        </button>
      )}
      {children}
    </nav>
  );
}

export default Navigation;

import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import burger from "../../images/burger.svg";
import burgerActive from "../../images/burger-active.svg";
import Popup from "../Popup/Popup";

function Header({ children, isMainPage, isActive, setIsActive, isHidden }) {
  const navigate = useNavigate();
  return (
    <>
      <header
        className={`header ${
          isMainPage
            ? isActive && "header_color_dark"
            : isActive && "header_color_light"
        }
        ${isHidden && "header_priority_low"}`}
      >
        <span
          onClick={() => navigate("/")}
          className={`header__logo ${
            !isMainPage && "header__logo_color_black"
          }`}
        >
          NewsExplorer
        </span>
        <button
          className={`header__button ${
            !isMainPage && "header__button_colored_light"
          } ${isHidden && "header__button_hidden"}`}
          onClick={() => setIsActive((state) => !state)}
          type="button"
        >
          <img src={isActive ? burgerActive : burger} alt="burger menu"></img>
        </button>
        {children}
      </header>
      <Popup isOpen={isActive} onClose={setIsActive} />
    </>
  );
}

export default Header;

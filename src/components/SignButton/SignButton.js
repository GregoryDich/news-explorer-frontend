import React from "react";
import "./SignButton.css";
import icon from "../../images/signout-white.svg";
import iconBlack from "../../images/signout-black.svg";

function SignButton({ loggedIn, isMainPage, setIsActive, handleSignClick }) {
  function handleClick() {
    handleSignClick();
    setIsActive(false);
  }
  return (
    <button
      onClick={handleClick}
      type="button"
      className={`sign-button ${!isMainPage && "sign-button_color_black"}`}
    >
      {!loggedIn ? "Sign in" : "Elise"}
      {loggedIn && (
        <img
          className="sign-button__icon"
          src={isMainPage ? icon : iconBlack}
          alt="sign out icon"
        />
      )}
    </button>
  );
}

export default SignButton;

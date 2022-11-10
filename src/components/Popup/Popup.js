import React from "react";
import "./Popup.css";

function Popup({ isOpen, onClose, children }) {
  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, [onClose]);
  function handleCloseClick(evt) {
    evt.target.classList.contains("popup_opened") && onClose();
  }
  return (
    <div
      onClick={handleCloseClick}
      className={`popup ${isOpen && "popup_opened"}`}
    >
      {children}
    </div>
  );
}

export default Popup;

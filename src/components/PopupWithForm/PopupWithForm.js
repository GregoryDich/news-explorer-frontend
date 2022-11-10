import React from "react";
import Popup from "../Popup/Popup";
import "./PopupWithForm.css";
import close from "../../images/close.svg";

function PopupWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  switchPopup,
  signError,
  handleAction,
}) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onClose();
  }
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="form">
        <form type="submit" onSubmit={handleSubmit}>
          <button
            onClick={onClose}
            className="form__close-button"
            type="button"
          >
            <img
              className="form__close-icon"
              src={close}
              alt="white cross icon"
            />
          </button>
          <h2 className="form__title">{title}</h2>
          {children}
          <p className="form__error">{signError}</p>
          <button
            onClick={handleAction}
            className="form__submit-button"
            type="submit"
          >
            {title}
          </button>
          <div className="form__button-container">
            <span className="form__button-secondary-text">or </span>
            <button
              onClick={switchPopup}
              className="form__button-secondary"
              type="button"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </Popup>
  );
}

export default PopupWithForm;

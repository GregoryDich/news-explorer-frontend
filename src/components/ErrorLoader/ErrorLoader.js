import React from "react";
import "./ErrorLoader.css";
import errorPic from "../../images/not-found.svg";

function ErrorLoader() {
  return (
    <div className="error-loader">
      <img className="error-loader__image" src={errorPic} alt="not found" />
      <h2 className="error-loader__title">Nothing found</h2>
      <p className="error-loader__text">
        Sorry, but nothing matched your search terms.
      </p>
    </div>
  );
}

export default ErrorLoader;

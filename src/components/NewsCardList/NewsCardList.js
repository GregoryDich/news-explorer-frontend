import React from "react";
import ErrorLoader from "../ErrorLoader/ErrorLoader";
import Preloader from "../Preloader/Preloader";
import "./NewsCardList.css";

function NewsCardList({ children, isSearching, searchSucceed }) {
  return (
    <section className="news-card-list">
      {isSearching ? (
        <>{!searchSucceed ? <ErrorLoader /> : <Preloader />}</>
      ) : (
        <>
          <h2 className="news-card-list__title">Search results</h2>
          <div className="news-card-list__container">
            <div className="news-card-list__cards">{children}</div>
          </div>
          <button type="button" className="news-card-list__button">
            Show more
          </button>
        </>
      )}
    </section>
  );
}

export default NewsCardList;

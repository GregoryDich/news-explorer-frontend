import React from "react";
import "./NewsCard.css";
import flag from "../../images/flag.svg";
import flagFlagged from "../../images/flag-flagged.svg";
import trash from "../../images/trashbox.svg";
import picture from "../../images/image_06.png";

function NewsCard({ loggedIn, isMainPage }) {
  const [isFlagged, setIsFlagged] = React.useState(false);

  function handleClick(evt) {
    evt.stopPropagation();
    if (loggedIn) {
      setIsFlagged((state) => !state);
    }
  }
  return (
    <article className="news-card">
      {!isMainPage && (
        <span className="news-card__keyword button-style">Parks</span>
      )}
      {isMainPage ? (
        <>
          <button
            onClick={handleClick}
            className={`news-card__button button-style ${
              !loggedIn && "news-card__button_disabled"
            }`}
          >
            {!isFlagged ? (
              <img className="news-card__flag" src={flag} alt="flag" />
            ) : (
              <img
                className="news-card__flag_marked"
                src={flagFlagged}
                alt="blue flag icon"
              />
            )}
          </button>
          <div className="news-card__reminder button-style">
            <span>Sign in to save articles</span>
          </div>
        </>
      ) : (
        <>
          <button className="news-card__button button-style news-card__button_disabled">
            <img className="news-card__trash" src={trash} alt="trash icon" />
          </button>
          <div className="news-card__reminder button-style">
            <span>Remove from saved</span>
          </div>
        </>
      )}
      <img className="news-card__image" src={picture} alt="alt" />
      <div className="news-card__info">
        <span className="news-card__date">February 19, 2019</span>
        <h2 className="news-card__title">
          Grand Teton Renews Historic Crest Trail
        </h2>
        <p className="news-card__text">
          “The linking together of the Cascade and Death Canyon trails, at their
          heads, took place on October 1, 1933, and marked the first step in the
          realization of a plan whereby the hiker will be...
        </p>
        <span className="news-card__source">National parks traveler</span>
      </div>
    </article>
  );
}

export default NewsCard;

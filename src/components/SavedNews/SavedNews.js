import React from "react";
import "./SavedNews.css";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCard from "../NewsCard/NewsCard";
import { useNavigate } from "react-router-dom";

function SavedNews({ loggedIn, isMainPage }) {
  const navigate = useNavigate();
  React.useEffect(() => {
    !loggedIn && navigate("/");
  }, [loggedIn, navigate]);
  return (
    <section className="saved-news">
      <SavedNewsHeader />
      <div className="saved-news__content">
        <div className="saved-news__cards">
          <NewsCard loggedIn={loggedIn} isMainPage={isMainPage} />
          <NewsCard loggedIn={loggedIn} isMainPage={isMainPage} />
          <NewsCard loggedIn={loggedIn} isMainPage={isMainPage} />
          <NewsCard loggedIn={loggedIn} isMainPage={isMainPage} />
          <NewsCard loggedIn={loggedIn} isMainPage={isMainPage} />
        </div>
      </div>
    </section>
  );
}
export default SavedNews;

import React from "react";
import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";
import NewsCard from "../NewsCard/NewsCard";

function Main({ loggedIn, isMainPage }) {
  return (
    <main className="main">
      <div className="main__search-container">
        <h1 className="main__title">What's going on in the world?</h1>
        <h2 className="main__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </h2>
        <SearchForm />
      </div>
      <NewsCardList isSearching={true} searchSucceed={false} />
      <NewsCardList isSearching={true} searchSucceed={true} />
      <NewsCardList>
        <NewsCard loggedIn={loggedIn} isMainPage={isMainPage} />
        <NewsCard loggedIn={loggedIn} isMainPage={isMainPage} />
        <NewsCard loggedIn={loggedIn} isMainPage={isMainPage} />
        <NewsCard loggedIn={loggedIn} isMainPage={isMainPage} />
        <NewsCard loggedIn={loggedIn} isMainPage={isMainPage} />
        <NewsCard loggedIn={loggedIn} isMainPage={isMainPage} />
      </NewsCardList>
      <About />
    </main>
  );
}

export default Main;

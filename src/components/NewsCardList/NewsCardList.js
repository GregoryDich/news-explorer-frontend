import React from 'react';
import Loader from '../Loader/Loader';
import './NewsCardList.css';

function NewsCardList({
  children,
  isOpen,
  searchResult,
  articles,
  handleCount,
  showMoreButton,
  searchErrorMessage,
}) {
  return (
    <section className={`news-card-list ${isOpen && 'news-card-list_opened'}`}>
      {articles.length ? (
        <>
          <h2 className='news-card-list__title'>Search results</h2>
          <div className='news-card-list__container'>
            <div className='news-card-list__cards'>{children}</div>
          </div>
          <button
            onClick={handleCount}
            className={`news-card-list__button ${
              showMoreButton && 'news-card-list__button_active'
            }`}
          >
            Show more
          </button>
        </>
      ) : searchErrorMessage ? (
        <p className='news-card-list__error'>{searchErrorMessage}</p>
      ) : (
        <Loader searchResult={searchResult} />
      )}
    </section>
  );
}

export default NewsCardList;

import React from 'react';
import './SavedNews.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCard from '../NewsCard/NewsCard';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function SavedNews({ onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <section className='saved-news'>
      <SavedNewsHeader />
      {currentUser.articles.length ? (
        <div className='saved-news__content'>
          <div className='saved-news__cards'>
            {currentUser.articles.map((card) => (
              <NewsCard
                key={card._id}
                card={card}
                onCardDelete={onCardDelete}
                isMainPage={false}
              />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
export default SavedNews;

import React from 'react';
import './NewsCard.css';
import flag from '../../images/flag.svg';
import flagFlagged from '../../images/flag-flagged.svg';
import trash from '../../images/trashbox.svg';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function NewsCard({ loggedIn, isMainPage, card, onCardSave, onCardDelete }) {
  const [isFlagged, setIsFlagged] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    currentUser.articles &&
      currentUser.articles.some((item) => item.title === card.title) &&
      setIsFlagged(true);
  }, [currentUser, card.title]);

  function formatDate(date) {
    const dateArr = date.toString().slice(0, 10).split('-', 3);
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    dateArr[1] = monthNames[parseInt(dateArr[1]) - 1];
    return `${dateArr[1]} ${dateArr[2]}, ${dateArr[0]}`;
  }
  function handleClick(evt) {
    evt.stopPropagation();
    if (loggedIn) {
      !isFlagged ? onCardSave(card) : onCardDelete(getCardId());
      setIsFlagged((state) => !state);
    }
  }
  function getCardId() {
    const currentSavedCard = currentUser.articles.find(
      (item) => card.title === item.title
    );
    return currentSavedCard._id;
  }
  function handleDeleteClick(evt) {
    evt.stopPropagation();
    onCardDelete(card._id);
  }
  return (
    <article
      onClick={() =>
        window.open(`${isMainPage ? card.url : card.link}`, '_blank')
      }
      className='news-card'
    >
      {!isMainPage && (
        <span className='news-card__keyword button-style'>{card.keyword}</span>
      )}
      {isMainPage ? (
        <>
          <button
            onClick={handleClick}
            className={`news-card__button button-style ${
              !loggedIn && 'news-card__button_disabled'
            }`}
          >
            {!isFlagged ? (
              <img className='news-card__flag' src={flag} alt='flag' />
            ) : (
              <img
                className='news-card__flag_marked'
                src={flagFlagged}
                alt='blue flag icon'
              />
            )}
          </button>
          <div className='news-card__reminder button-style'>
            <span>Sign in to save articles</span>
          </div>
        </>
      ) : (
        <>
          <button
            onClick={handleDeleteClick}
            className='news-card__button button-style news-card__button_disabled'
          >
            <img className='news-card__trash' src={trash} alt='trash icon' />
          </button>
          <div className='news-card__reminder button-style'>
            <span>Remove from saved</span>
          </div>
        </>
      )}
      <img
        className='news-card__image'
        src={isMainPage ? card.urlToImage : card.image}
        alt={isMainPage ? card.source.name : card.source}
      />
      <div className='news-card__info'>
        <span className='news-card__date'>
          {' '}
          {isMainPage ? formatDate(card.publishedAt) : formatDate(card.date)}
        </span>
        <h2 className='news-card__title'>{card.title}</h2>
        <p className='news-card__text'>
          {isMainPage ? card.description : card.text}
        </p>
        <span className='news-card__source'>
          {isMainPage ? card.source.name : card.source}
        </span>
      </div>
    </article>
  );
}

export default NewsCard;

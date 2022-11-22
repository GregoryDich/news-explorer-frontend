import React from 'react';
import './App.css';
import { useLocation, Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SignButton from '../SignButton/SignButton';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import SavedNews from '../SavedNews/SavedNews';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import FormInput from '../FormInput/FormInput';
import RegisterResult from '../RegisterResult/RegisterResult';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import newsApi from '../../utils/newsApi';
import Login from '../Login/Login';
import Register from '../Register/Register';
import {
  register,
  login,
  checkToken,
  getCurrentUser,
  getArticles,
  saveArticle,
  deleteArticle,
} from '../../utils/api';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const [isHidden, setIsHidden] = React.useState(false);
  const [isMainPage, setIsMainPage] = React.useState(true);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isRegisterResultPopupOpen, setIsRegisterResultPopupOpen] =
    React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [signError, setSignError] = React.useState('');
  const location = useLocation();
  const [articles, setArticles] = React.useState([]);
  const [searchErrorMessage, setSearchErrorMessage] = React.useState('');
  const [searchResult, setSearchResult] = React.useState(true);
  const [isCardListOpen, setIsCardListOpen] = React.useState(false);
  const [cardsCount, setCardsCount] = React.useState(3);
  const [showMoreButton, setShowMoreButton] = React.useState(true);

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    token &&
      checkToken(token)
        .then((res) => {
          if (res.user) {
            setCurrentUser(res.user);
            setLoggedIn(true);
          }
        })
        .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    loggedIn &&
      getArticles()
        .then((res) => {
          setCurrentUser((currentUser) => ({ ...currentUser, articles: res }));
        })
        .catch((err) => console.log(err));
  }, [loggedIn]);

  React.useEffect(() => {
    cardsCount > articles.length
      ? setShowMoreButton(false)
      : setShowMoreButton(true);
  }, [cardsCount, articles]);

  React.useEffect(() => {
    loggedIn &&
      getCurrentUser()
        .then((res) => {
          setCurrentUser((currentUser) => ({ ...currentUser, ...res.user }));
        })
        .catch((err) => console.log(err));
  }, [loggedIn]);

  React.useEffect(() => {
    location.pathname === '/saved-news'
      ? setIsMainPage(false)
      : setIsMainPage(true);
  }, [location.pathname]);

  React.useEffect(() => {
    isRegisterPopupOpen || isLoginPopupOpen || isRegisterResultPopupOpen
      ? setIsHidden(true)
      : setIsHidden(false);
  }, [isLoginPopupOpen, isRegisterPopupOpen, isRegisterResultPopupOpen]);

  React.useEffect(() => {
    const savedArticles = localStorage.getItem('articles');
    if (savedArticles && savedArticles !== '[]') {
      setArticles(JSON.parse(savedArticles).slice(0, cardsCount));
      setIsCardListOpen(true);
    }
  }, [cardsCount]);

  function closeAllPopup() {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsRegisterResultPopupOpen(false);
    setIsActive(false);
  }
  function removeArticle(id) {
    deleteArticle(id)
      .then((res) => {
        const arr = currentUser.articles.filter((item) => item._id !== id);
        setCurrentUser((currentUser) => ({
          ...currentUser,
          articles: arr,
        }));
      })
      .catch((err) => console.log(err));
  }
  function handleCount() {
    setCardsCount((cardsCount) => (cardsCount += 3));
  }
  function getData(keyword) {
    setSearchResult(true);
    setIsCardListOpen(true);
    localStorage.removeItem('articles');
    setArticles([]);
    setCardsCount(3);
    setSearchErrorMessage('');
    newsApi
      .getArticles(keyword)
      .then((res) => {
        !res.articles.length && setSearchResult(false);
        localStorage.setItem('keyword', keyword);
        localStorage.setItem('articles', JSON.stringify(res.articles));
        setArticles(res.articles);
      })
      .catch(() =>
        setSearchErrorMessage(
          'Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.'
        )
      );
  }
  function addArticle(data) {
    const keyword = localStorage.getItem('keyword');
    saveArticle(keyword, { data })
      .then((res) => {
        setCurrentUser((currentUser) => ({
          ...currentUser,
          articles: [...currentUser.articles, res],
        }));
      })
      .catch((err) => console.log(err));
  }
  function handleSwitchPopup() {
    if (isLoginPopupOpen) {
      closeAllPopup();
      setIsRegisterPopupOpen(true);
    }
    if (isRegisterPopupOpen) {
      closeAllPopup();
      openLoginPopup(true);
    }
    if (isRegisterResultPopupOpen) {
      closeAllPopup();
      openLoginPopup(true);
    }
  }
  function openLoginPopup(boolean) {
    setSignError('');
    closeAllPopup();
    setIsLoginPopupOpen(boolean);
  }
  function handleLogin(data) {
    setSignError('');
    login(data)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.message) {
          setSignError(res.message);
          return;
        }
        res.token && localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        closeAllPopup();
      })
      .catch((err) => console.log(err));
  }

  function handleRegister(data) {
    setSignError('');
    register(data)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.message) {
          setSignError(res.message);
          return;
        }
        closeAllPopup();
        setIsRegisterResultPopupOpen(true);
      })
      .catch((err) => console.log(err));
  }
  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('articles');
    setCurrentUser({});
  }
  function handleSignClick() {
    !loggedIn ? setIsLoginPopupOpen(true) : handleSignOut();
  }

  return (
    <div className={`app ${isMainPage && 'app-background'}`}>
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          isMainPage={isMainPage}
          isActive={isActive}
          setIsActive={setIsActive}
          isHidden={isHidden}
        >
          <Navigation
            loggedIn={loggedIn}
            isMainPage={isMainPage}
            isActive={isActive}
            setIsActive={setIsActive}
          >
            <SignButton
              loggedIn={loggedIn}
              isMainPage={isMainPage}
              handleSignClick={handleSignClick}
              setIsActive={setIsActive}
            />
          </Navigation>
        </Header>
        <Routes>
          <Route
            index
            path='/'
            element={
              <Main
                loggedIn={loggedIn}
                isMainPage={true}
                onSearch={getData}
                articles={articles}
                searchResult={searchResult}
                isOpen={isCardListOpen}
                searchErrorMessage={searchErrorMessage}
                handleCount={handleCount}
                showMoreButton={showMoreButton}
                cardsCount={cardsCount}
                onCardSave={addArticle}
                onCardDelete={removeArticle}
              />
            }
          />
          <Route
            path='/saved-news'
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <SavedNews onCardDelete={removeArticle} />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Login
          onClose={closeAllPopup}
          isOpen={isLoginPopupOpen}
          buttonText='Sign up'
          title='Sign in'
          signError={signError}
          handleAction={handleLogin}
          switchPopup={handleSwitchPopup}
        />
        <Register
          onClose={closeAllPopup}
          isOpen={isRegisterPopupOpen}
          buttonText='Sign in'
          title='Sign up'
          signError={signError}
          handleAction={handleRegister}
          switchPopup={handleSwitchPopup}
        />
        <RegisterResult
          isOpen={isRegisterResultPopupOpen}
          onClose={closeAllPopup}
          switchPopup={handleSwitchPopup}
          title='Registration successfully completed!'
        />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

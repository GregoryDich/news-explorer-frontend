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

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const [isHidden, setIsHidden] = React.useState(false);
  const [isMainPage, setIsMainPage] = React.useState(true);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isRegisterResultPopupOpen, setIsRegisterResultPopupOpen] =
    React.useState(false);
  const location = useLocation();

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

  function closeAllPopup() {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsRegisterResultPopupOpen(false);
  }

  function handleSwitchPopup() {
    if (isLoginPopupOpen) {
      closeAllPopup();
      setIsRegisterPopupOpen(true);
    }
    if (isRegisterPopupOpen) {
      closeAllPopup();
      setIsLoginPopupOpen(true);
    }
    if (isRegisterResultPopupOpen) {
      closeAllPopup();
      setIsLoginPopupOpen(true);
    }
  }

  function handleLogin() {
    setLoggedIn(true);
    closeAllPopup();
  }

  function handleRegister() {
    closeAllPopup();
    setIsRegisterResultPopupOpen(true);
  }

  function handleSignClick() {
    !loggedIn ? setIsLoginPopupOpen(true) : setLoggedIn(false);
  }

  return (
    <div className={`app ${isMainPage && 'app-background'}`}>
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
          element={<Main loggedIn={loggedIn} isMainPage={isMainPage} />}
        />
        <Route
          path='/saved-news'
          element={<SavedNews loggedIn={loggedIn} isMainPage={isMainPage} />}
        />
      </Routes>
      <PopupWithForm
        onClose={closeAllPopup}
        isOpen={isLoginPopupOpen}
        buttonText='Sign up'
        title='Sign in'
        signError='test error'
        handleAction={handleLogin}
        switchPopup={handleSwitchPopup}
      >
        <FormInput type='email' name='Email' placeholder='email' />
        <FormInput type='password' name='Password' placeholder='password' />
      </PopupWithForm>
      <PopupWithForm
        onClose={closeAllPopup}
        isOpen={isRegisterPopupOpen}
        buttonText='Sign in'
        title='Sign up'
        signError='test error'
        handleAction={handleRegister}
        switchPopup={handleSwitchPopup}
      >
        <FormInput type='email' name='Email' placeholder='email' />
        <FormInput type='password' name='Password' placeholder='password' />
        <FormInput type='text' name='Username' placeholder='username' />
      </PopupWithForm>
      <RegisterResult
        isOpen={isRegisterResultPopupOpen}
        onClose={closeAllPopup}
        switchPopup={handleSwitchPopup}
        title='Registration successfully completed!'
      />
      <Footer />
    </div>
  );
}

export default App;

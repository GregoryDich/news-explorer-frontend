import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import FormInput from '../FormInput/FormInput';

function Login({
  onClose,
  isOpen,
  buttonText,
  title,
  signError,
  handleAction,
  switchPopup,
}) {
  return (
    <>
      <PopupWithForm
        onClose={onClose}
        isOpen={isOpen}
        buttonText={buttonText}
        title={title}
        signError={signError}
        handleAction={handleAction}
        switchPopup={switchPopup}
      >
        <FormInput type='email' name='Email' placeholder='email' />
        <FormInput type='password' name='Password' placeholder='password' />
      </PopupWithForm>
    </>
  );
}

export default Login;

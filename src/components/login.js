import React from 'react';
import './login.css';
import { useTranslation } from 'react-i18next';


const Login = () => {
  const { t } = useTranslation();
  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="input-container">
        <label htmlFor="usernameEmail">Username/Email</label>
        <input type="text" id="usernameEmail" />
        <div className="input-line"></div>
      </div>
      <div className="input-container">
        <label htmlFor="usernameEmail">Password</label>
        <input type="text" id="password" />
        <div className="input-line"></div>
      </div>
      <div className='centered-content'>
      <button className="login-button">{t('login')}</button>
      <button className="guest-button">{t('continueAsGuest')}</button>
    </div>
      {/* Altri elementi del form di login */}
    </div>
  );
};

export default Login;

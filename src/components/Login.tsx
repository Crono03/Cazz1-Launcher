import './login.css';
import { getTranslation } from '../backend/languageManager';

// Quando la lingua cambia, impostala nel modulo di gestione delle lingue



const Login = () => {
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
      <button className="login-button">{getTranslation('login')}</button>
      <button className="guest-button">{getTranslation('continueAsGuest')}</button>
    </div>
      {/* Altri elementi del form di login */}
    </div>
  );
};

export default Login;
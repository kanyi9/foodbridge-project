
import React, { useState } from 'react';
import './Login.css'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerError, setRegisterError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'admin' && password === 'password') {
      console.log('Login successful!');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    // TO DO: Implement registration logic here
    // For now, just log the registration data to the console
    console.log('Registration data:', { name, email, registerPassword });
    setRegisterError(null);
  };

  const toggleRegisterForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="login-container">
      {isRegistering? (
        <form onSubmit={handleRegisterSubmit}>
          <h2 className="login-title">Sign Up</h2>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="login-input"
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="login-input"
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={registerPassword}
              onChange={(event) => setRegisterPassword(event.target.value)}
              className="login-input"
            />
          </label>
          <br />
          {registerError && <div className="login-error">{registerError}</div>}
          <button type="submit" className="login-button">
            Sign Up
          </button>
          <p>
            Already have an account? <a onClick={toggleRegisterForm}>Log In</a>
          </p>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2 className="login-title">Log In</h2>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="login-input"
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="login-input"
            />
          </label>
          <br />
          {error && <div className="login-error">{error}</div>}
          <button type="submit" className="login-button">
            Log In
          </button>
          <p>
            Don't have an account? <button type='submit' className='signup-button' onClick={toggleRegisterForm}>Sign Up</button>
          </p>
        </form>
      )}
    </div>
  );
}

export default Login;
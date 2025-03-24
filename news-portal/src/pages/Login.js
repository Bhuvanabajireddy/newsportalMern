
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Login.css'; 

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     setIsLoading(true);

    
//     setTimeout(() => {
//       const storedUser = localStorage.getItem('username');
//       const storedPass = localStorage.getItem('password');

//       if (username === storedUser && password === storedPass) {
//         setMessage('Login successful! Redirecting...');
//         setTimeout(() => {
//           navigate('/home'); 
//         }, 3000);
//       } else {
//         setMessage('Invalid credentials. Please try again.');
//       }
//       setIsLoading(false);
//     }, 1000); 
//   };

//   return (
//     <div className="login-page">
//       <div className="login-container">
//         <h2>Login</h2>
//         <form onSubmit={handleLogin}>
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit" disabled={isLoading}>
//             {isLoading ? 'Logging In...' : 'Login'}
//           </button>
//         </form>
//         {message && <p className="message">{message}</p>}
//         <p className="forgot-password">
//           <Link to="/forgot-password">Forgot Password?</Link>
//         </p>
//         <p className="signup-link">
//           Don't have an account? <Link to="/signup">Sign up</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import './Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token); // Store JWT token
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data
        setMessage('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/home'); 
        }, 2000);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging In...' : 'Login'}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
        <p className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Signup.css'; 

// const Signup = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSignup = (e) => {
//     e.preventDefault();
//     setIsLoading(true);

   
//     setTimeout(() => {
//       localStorage.setItem('username', username);
//       localStorage.setItem('password', password);
//       setMessage('Signup successful! Redirecting to login...');
//       setTimeout(() => {
//         navigate('/login'); 
//       }, 3000);
//       setIsLoading(false);
//     }, 1000); 
//   };

//   return (
//     <div className="signup-page">
//       <div className="signup-container">
//         <h2>Sign Up</h2>
//         <form onSubmit={handleSignup}>
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
//             {isLoading ? 'Signing Up...' : 'Sign Up'}
//           </button>
//         </form>
//         {message && <p className="message">{message}</p>}
//         <p className="login-link">
//           Already have an account? <Link to="/login">Log in</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(""); // Clear previous messages

    try {
      console.log("📤 Sending signup request...");

      const response = await fetch("http://localhost:5000/api/users/signup", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      console.log("🔄 Response Status:", response.status); // Debugging log

      const data = await response.json();
      console.log("📥 Server Response:", data); // Debugging log

      if (response.ok) {
        setMessage("✅ Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setMessage(data.message || "⚠️ Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("🚨 Signup error:", error);
      setMessage("⚠️ Could not connect to the server. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
        <p className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

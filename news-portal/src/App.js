import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Categories from './pages/Categories';
import NewsCategory from './pages/NewsCategory';
import Home from './pages/Home'; 
import Header from './components/Header';
import Navbar from './components/Navbar';


function AppContent() {
  const location = useLocation(); 

  
  const noNavbarRoutes = ['/', '/login', '/signup', '/forgot-password']; 

 
  const shouldShowNavbar = !noNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* Header appears on all pages */}
      <Header />

      {/* Navbar should NOT appear on Login, Signup, or Forgot Password pages */}
      {shouldShowNavbar && <Navbar />}

      {/* Define Routes for Different Pages */}
      <Routes>
        {/* Default Route -> Redirect to Login */}
        <Route path="/" element={<Login />} />
        
        {/* Home Page */}
        <Route path="/home" element={<Home />} />

        {/* Authentication Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* News Pages */}
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:category" element={<NewsCategory />} />
      </Routes>
    </>
  );
}


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

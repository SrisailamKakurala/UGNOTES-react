import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Addnotes from './Pages/Addnotes';
import Profile from './Pages/Profile';
import Pdfinfo from './Pages/Pdfinfo';
import Login from './Pages/Login';
import Signup from './Pages/Signup';

const App = () => {


  // Get the current location
  const location = useLocation();

  // Conditionally render the Navbar based on the current route
  const showNavbar = location.pathname !== '/' && location.pathname !== '/login';


  return (
    <div className='font-["Ubuntu"]'>

      {showNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/addnotes' element={<Addnotes />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/pdfInfo' element={<Pdfinfo />} />
      </Routes>
    </div>
  );
};

export default App;

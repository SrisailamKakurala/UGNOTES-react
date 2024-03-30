import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Addnotes from './Pages/Addnotes'
import Profile from './Pages/Profile'
import Pdfinfo from './Pages/Pdfinfo'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import axios from 'axios'

const App = () => {
  return (
    <div className='font-["Ubuntu"]'>
      {/* <Navbar /> */}
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/addnotes' element={<Addnotes />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/pdfInfo' element={<Pdfinfo />} />
      </Routes>
    </div>
  )
}

export default App
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useState, useEffect } from 'react';
import { useUser } from '../Context/UserContext';

const Navbar = () => {
  
  const { trigger } = useUser()
  const [dummy, setDummy] = useState(null);
  const [Home, setHome] = useState(true);
  const [Addnotes, setAddnotes] = useState(false);
  const [userProfile, setUserProfile] = useState('');

  useEffect(() => {
    // Fetch user information from local storage
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.profile) {
      setUserProfile(userData.profile);
    }
    setDummy(prev => !prev);
  }, [trigger]);

  return (
    <div className="relative z-50 shadow-xl px-5 md:px-12 lg:px-20 py-2 flex justify-between items-center">
      <Link to={'/home'}>
        <img onClick={() => { setHome(true); setAddnotes(false) }} className='h-16' src={logo} alt="" />
      </Link>
      <ul className='flex gap-5 sm:gap-10  font-bold text-xl items-end'>
        <li onClick={() => { setHome(true); setAddnotes(false) }} className="hover:text-pink-500 cursor-pointer"><Link to={'/home'}>Home</Link> {Home ? <hr className='h-1 rounded-lg bg-pink-500' /> : null}</li>
        <li onClick={() => { setHome(false); setAddnotes(true) }} className="hover:text-pink-500 cursor-pointer"><Link to={'/addnotes'}>Add Notes</Link> {Addnotes ? <hr className='h-1 rounded-lg bg-pink-500' /> : null}</li>
      </ul>
      <Link to={'/profile'}>
        <img onClick={() => { setHome(false); setAddnotes(false) }} className='profile cursor-pointer rounded-full w-12 h-12' src={userProfile} alt="User Profile" />
      </Link>
    </div>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../features/login/loginApiSlice';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      console.error('Logout failed:', error);
    }
    localStorage.clear();
    navigate('/login');
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-transparent border-b text-white shadow-md z-50 relative">
      <div className="container mx-auto px-4 py-4 flex  justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className=" sm:text-2xl font-bold flex items-center gap-2 hover:text-blue-400 transition duration-200"
        >
          <img src="/logo.png" alt="Meeting Schedula" className='w-12 h-12' />
        </Link>

        {/* Hamburger Icon */}
        <button
          className="sm:hidden"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menu */}
        <nav
          className={`absolute sm:static top-16 left-0 w-full sm:w-auto bg-gray-900 sm:bg-transparent transition-all duration-300 ease-in-out 
          ${isOpen ? 'block' : 'hidden'} sm:flex sm:items-center z-50 items-center`}
        >
          <ul className="flex flex-col sm:flex-row gap-2 sm:gap-6 px-4 sm:px-0 mt-2 sm:py-0">
            <li className="text-center hover:bg-yellow-500 sm:hover:bg-transparent sm:p-0 p-2 rounded">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="block hover:text-blue-400"
              >
                Home
              </Link>
            </li>

            {!token ? (
              <>
              <li className="text-center sm:bg-transparent bg-yellow-500 hover:bg-yello-600 sm:hover:bg-transparent   sm:p-0 p-2 rounded mb-4 duration-300">                <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="  text-white px-4 py-2 rounded-md transition w-full sm:w-auto"
              >
                Login
              </Link>
              </li>
              <li className="text-center sm:bg-transparent bg-yellow-500 hover:bg-yello-600 sm:hover:bg-transparent   sm:p-0 p-2 rounded mb-4 duration-300">                <Link
                to="/admin/login"
                onClick={() => setIsOpen(false)}
                className="  text-white px-4 py-2 rounded-md transition w-full sm:w-auto"
              >Admin Login
              </Link>
              </li>
              </>

            ) : (
              <>
                <li className="text-center hover:bg-yellow-500 sm:hover:bg-transparent sm:p-0 p-2 rounded">
                  <Link
                    to="/meeting"
                    onClick={() => setIsOpen(false)}
                    className="block hover:text-blue-400"
                  >
                    Meeting
                  </Link>
                </li>

                {isAdmin && (
                  <li className="text-center duration-300 hover:bg-yellow-500 sm:hover:bg-transparent sm:p-0 p-2 rounded">
                    <Link
                      to="/adminDashboard"
                      onClick={() => setIsOpen(false)}
                      className="block hover:text-blue-400"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}

                <li className="text-center sm:bg-transparent bg-red-500 hover:bg-red-600 sm:hover:bg-transparent   sm:p-0 p-2 rounded mb-4 duration-300">
                  <Link
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className=" text-white px-4 py-2 rounded-md transition w-full sm:w-auto"
                  >
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

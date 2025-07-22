import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../features/login/loginApiSlice';

const Header = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const handleLogout = async() => {
    await logout().unwrap();
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-gray-900 text-white shadow-md h-16 flex items-center">
      <div className="container mx-auto px-4 flex justify-between items-center w-full">
        {/* Logo */}
        <Link to="/" className="text-xl sm:text-2xl font-bold flex items-center gap-2 hover:text-blue-400 transition duration-200">
          🗓️ Meeting Scheduler
        </Link>

        {/* Navigation */}
        <nav>
          <ul className="flex items-center gap-4 sm:gap-6 text-base">
            <li>
              <Link to="/" className="hover:text-blue-400 transition duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/meeting" className="hover:text-blue-400 transition duration-200">
                Meeting
              </Link>
            </li>

            {!token ? (
              <li>
                <Link to="/login" className="hover:bg-blue-600 px-4 py-2 bg-blue-500 rounded-md transition duration-200">
                  Login
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/dashboard" className="hover:text-blue-400 transition duration-200">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className=" hover:bg-red-600 text-white px-4 py-2 bg-red-500 rounded-md transition duration-200"
                  >
                    Logout
                  </button>
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

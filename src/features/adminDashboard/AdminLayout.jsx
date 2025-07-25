import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import clsx from 'clsx'; // Optional: for cleaner conditional classes

const AdminLayout = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-white text-center mb-6">
        Meetings Dashboard
      </h2>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8 border-b border-gray-600">
        <Link
          to="/adminDashboard/apointments"
          className={clsx(
            'px-4 py-2 text-sm font-semibold transition',
            isActive('/adminDashboard/apointments')
              ? 'text-yellow-500 border-b-2 border-yellow-500'
              : 'text-gray-400 hover:text-yellow-400'
          )}
        >
          Appointments
        </Link>

        <Link
          to="/adminDashboard/manage-meetings"
          className={clsx(
            'ml-6 px-4 py-2 text-sm font-semibold transition',
            isActive('/adminDashboard/manage-meetings')
              ? 'text-green-400 border-b-2 border-green-400'
              : 'text-gray-400 hover:text-green-300'
          )}
        >
          Manage Meetings
        </Link>
      </div>

      {/* Nested Route Content */}
      <div className="bg-transparent p-6 rounded shadow">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;

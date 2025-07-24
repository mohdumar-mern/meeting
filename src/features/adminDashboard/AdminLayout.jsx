import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-white text-center mb-6">
        Meetings Dashboard
      </h2>

      {/* Navigation Links */}
      <div className="mt-8 flex flex-wrap gap-4 justify-center mb-8">
        <Link
          to="/adminDashboard/apointments"
          className="text-white bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-700 transition"
        >
          Apointment
        </Link>
        <Link
          to="/adminDashboard/manage-meetings"
          className="text-white bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Manage Meetings
        </Link>
      </div>

      {/* Nested Route Outlet */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;

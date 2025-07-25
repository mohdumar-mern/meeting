import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import { Suspense, lazy } from 'react';
import AdminLogin from './features/login/AdminLogin';
import NotFound from './pages/NotFound';
import AdminLayout from './features/adminDashboard/AdminLayout';
import ManageMeeting from './features/meeting/ManageMeeting';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./features/login/LoginForm'));
const MeetingForm = lazy(() => import('./features/meeting/MeetingForm'));
const AdminDashboard = lazy(() => import('./features/adminDashboard/Dashboard'));
const AdminScheduleForm = lazy(() => import('./components/SchedularForm'));

function App() {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true'; // make sure it's a boolean

  return (
    <Router>
      <Header />
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <Routes>
          {/* Redirect if admin */}

          <Route path="/" element={<Home />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin/login"
            element={
              token && isAdmin ? <Navigate to="/adminDashboard" replace /> : <AdminLogin />
            }
          />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/adminDashboard" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="apointments" element={<AdminDashboard />} />
              <Route path="manage-meetings" element={<ManageMeeting />} />
            </Route>

            <Route path="/meeting" element={<MeetingForm />} />
            <Route path="/dashboard/meetings/:id" element={<AdminScheduleForm />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

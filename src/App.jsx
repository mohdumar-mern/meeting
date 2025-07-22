import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import { Suspense, lazy } from 'react';

// Lazy-loaded pages for better performance
const Home = lazy(() => import('./pages/Home'));
const MeetingForm = lazy(() => import('./features/meeting/MeetingForm'));
const Login = lazy(() => import('./features/login/LoginForm'));
const AdminDashboard = lazy(() => import('./features/adminDashboard/Dashboard'));
const AdminScheduleForm = lazy(() => import('./components/SchedularForm'));

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/meeting" element={<MeetingForm />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/dashboard/meetings/:id" element={<AdminScheduleForm />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

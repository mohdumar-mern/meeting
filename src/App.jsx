import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import MeetingForm from "./features/meeting/MeetingForm"
import Login from "./features/login/LoginForm"
import AdminDashboard from "./features/adminDashboard/Dashboard"
import AdminScheduleForm from "./components/SchedularForm"
import PrivateRoute from "./components/PrivateRoute"

function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meeting" element={<MeetingForm />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/dashboard/meetings/:id" element={<AdminScheduleForm />} />
        </Route>

      </Routes>
    </Router>

  )
}

export default App

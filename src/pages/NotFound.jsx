// src/pages/NotFound.jsx
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-b from-yellow-50 to-white text-gray-800 px-6">
      <img
        src="https://illustrations.popsy.co/white/resistance-band.svg"
        alt="404 Illustration"
        className="w-full max-w-md mb-8"
      />
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl font-semibold mb-6">Oops! Page not found.</p>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition-all duration-300"
      >
        {/* <FaArrowLeft /> */}
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;

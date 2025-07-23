import { Link } from 'react-router-dom'

const Home = () => {
  const token = localStorage.getItem("token")


  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-r from-blue-100 to-purple-200 px-4 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
        Welcome to janSuraaj Meeting Manager!
      </h1>

      <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl">
        Easily manage and schedule your meetings with just a few clicks.
      </p>

      {
        token ?
          (
            <Link
              to="/meeting"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-200"
            >
              Get Started
            </Link>
          ) :
          (
            <Link
              to="/login"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-200"
            >
              Get Started
            </Link>
          )
      }

    </div>
  )
}

export default Home

import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">
            MyOAuthApp
          </Link>
        </div>

        {/* Center: Search bar */}
        <div className="flex-1 mx-6 hidden sm:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Right: Navigation options */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Register
          </Link>
          <Link
            to="/dashboard"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

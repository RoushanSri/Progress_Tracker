import { useState, useEffect } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { LayoutDashboard, MessageCircle, Projector, User, Wrench } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

const SettingsPage = () => {
  const location = useLocation();

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="container mx-auto px-[5vw] py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {darkMode ? <FiSun className="w-6 h-6" /> : <FiMoon className="w-6 h-6" />}
          </button>
        </div>
        <div className="flex flex-col lg:flex-row w-full min-h-[80vh]">
          <div className="w-full lg:w-1/4 p-4 bg-gray-200 dark:bg-gray-900 rounded-lg lg:mr-4 mb-4 lg:mb-0">
            <nav>
              <ul className="space-y-6 px-2 duration-200">
                <li
                  className={`mb-2 flex items-center rounded-lg p-2 ${
                    location.pathname === "/u/settings" ? "bg-gray-800 border-2 border-gray-700" : ""
                  }`}
                >
                  <User className="w-5 h-5 mr-2" />
                  <Link to={""} className="text-gray-800 w-full text-xl dark:text-gray-200">
                    Profile
                  </Link>
                </li>
                <li
                  className={`mb-2 flex items-center rounded-lg p-2 ${
                    location.pathname === "/u/settings/socials" ? "bg-gray-800 border-2 border-gray-700" : ""
                  }`}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  <Link to={"socials"} className="text-gray-800 w-full text-xl dark:text-gray-200">
                    Socials
                  </Link>
                </li>
                <li
                  className={`mb-2 flex items-center rounded-lg p-2 ${
                    location.pathname === "/u/settings/platforms" ? "bg-gray-800 border-2 border-gray-700" : ""
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5 mr-2" />
                  <Link to={"platforms"} className="text-gray-800 w-full text-xl dark:text-gray-200">
                    Platforms
                  </Link>
                </li>
                <li
                  className={`mb-2 flex items-center rounded-lg p-2 ${
                    location.pathname === "/u/settings/projects" ? "bg-gray-800 border-2 border-gray-700" : ""
                  }`}
                >
                  <Projector className="w-5 h-5 mr-2" />
                  <Link to={"projects"} className="text-gray-800 w-full text-xl dark:text-gray-200">
                    Projects
                  </Link>
                </li>
                <li
                  className={`mb-2 flex items-center rounded-lg p-2 ${
                    location.pathname === "/u/settings/account" ? "bg-gray-800 border-2 border-gray-700" : ""
                  }`}
                >
                  <Wrench className="w-5 h-5 mr-2" />
                  <Link to={"account"} className="text-gray-800 w-full text-xl dark:text-gray-200">
                    Accounts
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="w-full lg:w-3/4 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
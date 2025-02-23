import { Route, RouterProvider, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import UserProtector from "./components/UserProtector";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard";
import Doubts from "./pages/Doubts";
import SettingsPage from "./pages/Settings_page";
import Material from "./pages/Material";
import Profile from "./components/Profile";
import Socials from "./components/Socials";
import Platforms from "./components/Platforms";
import Account from "./components/Account";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/dashboard"
          element={
            <UserProtector>
              <Dashboard />
            </UserProtector>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <UserProtector>
              <Leaderboard />
            </UserProtector>
          }
        />
        <Route
          path="/doubts"
          element={
            <UserProtector>
              <Doubts />
            </UserProtector>
          }
        />
        <Route
          path="/material"
          element={
            <UserProtector>
              <Material />
            </UserProtector>
          }
        />
        <Route
          path="/settings"
          element={
            <UserProtector>
              <SettingsPage />
            </UserProtector>
          }
        >
          <Route path="" element={<Profile />} />
          <Route path="socials" element={<Socials />} />
          <Route path="platforms" element={<Platforms />} />
          <Route path="account" element={<Account />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

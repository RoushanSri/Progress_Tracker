import { Route, Routes } from "react-router-dom";
import UserProtector from "./components/UserProtector";
import Leaderboard from "./pages/Leaderboard";
import SettingsPage from "./pages/Settings_page";
import Profile from "./components/Profile";
import Platforms from "./components/Platforms";
import Account from "./components/Account";
import AuthLayout from "./pages/AuthLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MainLayout from "./pages/MainLayout";
import Dashboard from "./pages/Dashboard";
import TargetUser from "./pages/TargetUser";
import Activities from "./components/Activities";
import RemoveProjects from "./components/RemoveProject";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route
          path="/u/"
          element={
            <UserProtector>
              <MainLayout />
            </UserProtector>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="activities" element={<Activities />} />
          <Route path={`dashboard/:id`} element={<TargetUser/>} />
          <Route
          path="settings"
          element={
              <SettingsPage />
          }
        >
          <Route path="" element={<Profile />} />
          <Route path="platforms" element={<Platforms />} />
          <Route path="RemoveProjects" element={<RemoveProjects />} />
          <Route path="AddProjects" element={<Activities/>}/>
          <Route path="account" element={<Account />} />
        </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

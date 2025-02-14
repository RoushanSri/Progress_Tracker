import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import UserProtector from "./components/UserProtector";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard";
import Doubts from "./pages/Doubts";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<UserProtector>
          <Dashboard/>
        </UserProtector>} />
        <Route path="/leaderboard" element={<UserProtector>
          <Leaderboard/>
        </UserProtector>}/>
        <Route path="/doubts" element={<UserProtector>
          <Doubts/>
        </UserProtector>}/>
      </Routes>
    </>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import LeaderBoard from "./pages/LeaderBoard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

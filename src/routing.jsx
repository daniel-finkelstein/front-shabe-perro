import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './Components/About/About';
import Login from './Components/Profile/Login';
import Signup from './Components/Profile/Signup';
import Match from './Components/Game/Match/Match';
import Battle from './Components/Game/Battle/Battle';
import HomePage from './Components/Home/HomePage';
import App from './common/App';
import Rules from './Components/Rules/Rules';
import Search from './Components/Search/Search';
import EditProfile from './Components/Profile/Edit';

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/about" element={<About />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/matches/:matchId" element={<Match />} />
        <Route path="/matches/:matchId/battles/:battleId" element={<Battle />} />
        <Route path="/search" element={<Search />} />
        <Route path="/edit" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;

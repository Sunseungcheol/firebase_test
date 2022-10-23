import { HashRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <HashRouter>
      {isLoggedIn && <Navigation userObj={userObj} />}

      <Routes>
        {isLoggedIn ? (
          <Route exact path="/" element={<Home userObj={userObj} />} />
        ) : (
          <Route exact path="/" element={<Auth userObj={userObj} />} />
        )}
        <Route exact path="/Profile" element={<Profile userObj={userObj} />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;

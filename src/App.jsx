import React from "react";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Feed from "./components/Feed";

import Connections from "./components/Connections";
import Requests from "./components/Requests";
const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              {/* <Route path="/signup" element={<Signup />} /> */}
              <Route path="/connections" element={<Connections/>} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            {/* <Route path="/login" element={}/>
          <Route path="/test" element={} /> */}
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;

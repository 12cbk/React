import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App"; 
import Managefeed from "./Managefeed";
import Userfeed from "./Userfeed";
import Callback from "./callback";

const AppRoutes = () => {
  return (
    <Routes>
          <Route path="/" element={<App />} />
          <Route path="/callback" element={<Callback />} />

      <Route path="/Managefeed" element={<Managefeed />} />
      <Route path="/userfeed" element={<Userfeed />} />
      
    </Routes>
  );
};

export default AppRoutes;

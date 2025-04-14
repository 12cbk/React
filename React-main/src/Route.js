import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App"; // Your home page
import Managefeed from "./Managefeed"; // Your next UI component

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Managefeed" element={<Managefeed />} />
      
    </Routes>
  );
};

export default AppRoutes;

import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App"; 
import Managefeed from "./Managefeed"; 

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Managefeed" element={<Managefeed />} />
      
    </Routes>
  );
};

export default AppRoutes;

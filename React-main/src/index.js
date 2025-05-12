import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './tailwind.css';
import App from './App';
import Header from './Outline';
import reportWebVitals from './reportWebVitals';
import Card from './card';
import Footer from './Footer';
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './Route';
import Dropdown from './dropdown';
import { HeroUIProvider } from "@heroui/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HeroUIProvider>
    
    <BrowserRouter>
      {/* <Card/> */}
      <AppRoutes />
      <Footer/>    
    </BrowserRouter>
  </HeroUIProvider>
);


reportWebVitals();
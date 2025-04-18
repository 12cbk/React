import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './tailwind.css';
import App from './App';
import Header from './Outline';
import reportWebVitals from './reportWebVitals';
import Card from './card';
// import Menu from './Menu';
// import Test from './test';
import Footer from './Footer';
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './Route';
import Dropdown from './dropdown';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
   <BrowserRouter>
   {/* <Card/> */}
    <AppRoutes />
    <Footer/>    
    
  </BrowserRouter>,
  
    
  
    
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

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
import Displaycard from './displaycard'
import { HeroUIProvider } from "@heroui/react";
import DatePicker from "./DatePicker";
import { Auth0Provider } from "@auth0/auth0-react";

//const domain = "dev.id.oup.com";
//const clientId = "JMDZN12OLyR8prg8UpB8tjWVJTdq6AkD";
//const domain = "dev-xe1pg5qv1cephpyp.us.auth0.com";
//const clientId = "9NSC65Biw9wR8zp0Ujwp225aoOhBeRKn";
//const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
//const redirectUri = window.location.origin;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HeroUIProvider>
        <BrowserRouter>
            <Card />
            <AppRoutes />
            <Footer />
        </BrowserRouter>
    </HeroUIProvider>
);

reportWebVitals();
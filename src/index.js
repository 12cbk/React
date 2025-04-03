import React from "react";
import ReactDOM from "react-dom/client"; // Use ReactDOM from "react-dom/client" for React 18+
import "./index.css";
import App from "./App";
import { AppProvider } from "./Components/Appcontext";
// Get the root element
const root = ReactDOM.createRoot(document.getElementById("root")); 

// Render the App component
root.render(
  <AppProvider>
    <App />
  </AppProvider>
);

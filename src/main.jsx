import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );


// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { AuthProvider } from "./AuthContext";   // ✅ IMPORTANT

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
//       <AuthProvider>       {/* ✅ MUST wrap App */}
//         <App />
//       </AuthProvider>
//     </GoogleOAuthProvider>
//   </React.StrictMode>
// );


// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";

// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { AuthProvider } from "./AuthContext"; // ✅ Must wrap App

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
//       <AuthProvider>
//         <App />
//       </AuthProvider>
//     </GoogleOAuthProvider>
//   </React.StrictMode>
// );


// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import { AuthProvider } from "./AuthContext.jsx";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import "./index.css";

// const clientId =
//   import.meta.env.VITE_GOOGLE_CLIENT_ID 
//   console.log("VITE_GOOGLE_CLIENT_ID:", clientId);


// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <GoogleOAuthProvider clientId={clientId}>
//       <AuthProvider>
//         <App />
//       </AuthProvider>
//     </GoogleOAuthProvider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./AuthContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";

// 1️⃣ Try env first
const ClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// 2️⃣ Debug log
console.log("VITE_GOOGLE_CLIENT_ID from env:", ClientId);

// 3️⃣ TEMP: fallback hardcoded (your real client ID)
const clientId =
  ClientId ||
  "946209021895-837t3rfeql79jgqc3hv4f81r3hovbv0r.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [isLoggedIn, setLoggedIn] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedToken = localStorage.getItem("token");

//     if (storedUser && storedToken) {
//       try {
//         const parsedUser = JSON.parse(storedUser);
//         setUser(parsedUser);
//         setLoggedIn(true);
//       } catch (err) {
//         console.error("Invalid JSON in localStorage: user");
//         localStorage.removeItem("user");
//         localStorage.removeItem("token");
//         setUser(null);
//         setLoggedIn(false);
//       }
//     }
//   }, []);

//   const login = (userData, token) => {
//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("token", token);
//     localStorage.setItem("role", JSON.stringify([userData.role || "customer"]));
//     setUser(userData);
//     setLoggedIn(true);
//   };

//   const logout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     setUser(null);
//     setLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }



// src/AuthContext.jsx

// // src/AuthContext.js
// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);

//   // Load from localStorage on mount
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     const storedToken = localStorage.getItem("token");

//     if (storedUser && storedToken) {
//       setUser(storedUser);
//       setToken(storedToken);
//     }
//   }, []);

//   const login = (userData, token) => {
//     setUser(userData);
//     setToken(token);
//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("token", token);
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//   };

//   const isLoggedIn = !!user;

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout, isLoggedIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



// // AuthContext.jsx
// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);

//   // On app load, try to get user/token from localStorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedToken = localStorage.getItem("token");
//     if (storedUser && storedToken) {
//       setUser(JSON.parse(storedUser));
//       setToken(storedToken);
//     }
//   }, []);

//   const login = (userData, tokenData) => {
//     setUser(userData);
//     setToken(tokenData);
//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("token", tokenData);
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//   };

//   const isLoggedIn = !!user;

  

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout, isLoggedIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



// // src/AuthContext.jsx
// import { createContext, useContext, useState, useEffect } from "react";
// import api from "./api"; // your axios instance

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   // const [loading, setLoading] = useState(true); // To wait for localStorage load

//   // On app load, try to get user/token from localStorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedToken = localStorage.getItem("token");
//     if (storedUser && storedToken) {
//       setUser(JSON.parse(storedUser));
//       setToken(storedToken);
//     }
//     // setLoading(false);
//   }, []);

//   // Login function
  
//   const login = async (userData, tokenData) => {
//   setUser(userData);
//   setToken(tokenData);
//   localStorage.setItem("user", JSON.stringify(userData));
//   localStorage.setItem("token", tokenData);

//   const guestCart = JSON.parse(localStorage.getItem("cart") || "[]");
//   if (guestCart.length > 0) {
//     try {
//       await api.post("/cart/sync", { items: guestCart }, {
//         headers: { Authorization: `Bearer ${tokenData}` },
//       });
//       localStorage.removeItem("cart"); // clear guest cart
//     } catch (err) {
//       console.error("Cart sync failed:", err);vvvvvvv
//     }
//   }
// };



//   // Logout function
//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//   };

//   const isLoggedIn = !!user;

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout, isLoggedIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use AuthContext
// export const useAuth = () => useContext(AuthContext);



// import { createContext, useContext, useState, useEffect } from "react";
// import api from "./api"; // your axios instance

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(true); // ✅ Added loading state

//   // On app load, try to get user/token from localStorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedToken = localStorage.getItem("token");

//     if (storedUser && storedToken) {
//       setUser(JSON.parse(storedUser));
//       setToken(storedToken);
//     }

//     setLoading(false); // ✅ Done loading after checking localStorage
//   }, []);

//   // Login function
//   const login = async (userData) => {
//     setUser(userData);
   
//     // localStorage.setItem("user", JSON.stringify(userData));
//     // localStorage.setItem("token", tokenData);

//     const guestCart = JSON.parse(localStorage.getItem("cart") || "[]");
//     if (guestCart.length > 0) {
//       // try {
//       //   await api.post(
//       //     "/cart/sync",
//       //     { items: guestCart },
//       //     { headers: { Authorization: `Bearer ${tokenData}` } }
//       //   );
//       //   localStorage.removeItem("cart"); // clear guest cart
//       // } catch (err) {
//       //   console.error("Cart sync failed:", err);
//       // }
//        try {
//       await api.post("/cart/sync", { items: guestCart });
//       localStorage.removeItem("cart");
//     } catch (err) {
//       console.error("Cart sync failed:", err);
//     }
//     }
//   };

//   // Logout function
//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//   };

//   const isLoggedIn = !!user;

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout, isLoggedIn, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use AuthContext
// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState, useEffect } from "react";
import api from "./api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user document
  const [loading, setLoading] = useState(true);

  // On app load, try reading user from backend via cookie
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await api.get("/users/profile"); // GET /api/users/profile
        if (res.success && res.user) {
          setUser(res.user);
        }
      } catch (err) {
        // not logged in → ignore
        console.log("Profile load error (probably not logged in):", err.message);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // LOGIN: just set user; cookie already set by backend
  const login = async (userData) => {
    setUser(userData);

    // Guest cart sync
    const guestCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (guestCart.length > 0) {
      try {
        await api.post("/cart/sync", { items: guestCart });
        localStorage.removeItem("cart");
      } catch (err) {
        console.error("Cart sync failed:", err);
      }
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    }
    setUser(null);
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoggedIn,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
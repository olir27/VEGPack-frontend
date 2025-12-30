



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

// import { createContext, useContext, useState, useEffect } from "react";
// import api from "./api";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // user document
//   const [loading, setLoading] = useState(true);

//   // On app load, try reading user from backend via cookie
//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         const res = await api.get("/users/profile"); // GET /api/users/profile
//         if (res.success && res.user) {
//           setUser(res.user);
//         }
//       } catch (err) {
//         // not logged in → ignore
//         console.log("Profile load error (probably not logged in):", err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadUser();
//   }, []);

//   // LOGIN: just set user; cookie already set by backend
//   const login = async (userData) => {
//     setUser(userData);

//   //   // Guest cart sync
//   //   const guestCart = JSON.parse(localStorage.getItem("cart") || "[]");
//   //   if (guestCart.length > 0) {
//   //     try {
//   //       await api.post("/cart/sync", { items: guestCart });
//   //       localStorage.removeItem("cart");
//   //     } catch (err) {
//   //       console.error("Cart sync failed:", err);
//   //     }
//   //   }
//   // };

//   const logout = async () => {
//     try {
//       await api.post("/auth/logout");
//     } catch (err) {
//       console.error("Logout error:", err);
//     }
//     setUser(null);
//   };

//   const isLoggedIn = !!user;

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         login,
//         logout,
//         isLoggedIn,
//         loading,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



// src/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import api from "./api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   // MongoDB user document
  const [loading, setLoading] = useState(true);

  // App load ஆனவுடன் /users/profile மூலமா user ஏற்கனவே login ஆ இருக்கானு check பண்ணுறது
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await api.get("/users/profile"); // GET /api/users/profile
        if (res.success && res.user) {
          setUser(res.user);
        }
      } catch (err) {
        // Not logged in / token invalid → user = null
        console.log(
          "Profile load error (probably not logged in):",
          err.message || err
        );
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // LOGIN: backend already cookie set பண்ணிருக்கும், இங்க user data மட்டும் stateல வைச்சுக்கறோம்
  const login = async (userData) => {
    setUser(userData);
    // Guest cart sync need illa – Add to cart guestக்கு allow பண்ணவே முடியாது
  };

  // LOGOUT
  const logout = async () => {
    try {
      await api.post("/auth/logout"); // POST /api/auth/logout → cookie clear
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
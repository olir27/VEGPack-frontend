



// src/components/Navbar.jsx
// import { Link, useNavigate } from "react-router-dom";
// import { FaShoppingCart, FaUser } from "react-icons/fa";
// import { useAuth } from "../AuthContext";

// export default function Navbar() {
//   const { user, isLoggedIn, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleFarmerClick = () => {
//     if (!isLoggedIn) {
//       const answer = window.confirm("Are you a farmer? Click OK to register as farmer.");
//       if (answer) navigate("/register");
//     } else if (user.role === "farmer") {
//       navigate("/farmer");
//     } else {
//       const answer = window.confirm("Are you a farmer? Click OK to register as farmer.");
//       if (answer) navigate("/farmer");
//     }
//   };

//   const handleAdminClick = () => {
//     if (user?.role === "admin") {
//       navigate("/farmer");
//     }
//   };

//   return (
//     <nav className="flex items-center justify-between px-6 py-4 bg-green-200 text-black">
//       <div className="flex items-center space-x-2">
//         <span className="text-2xl font-bold text-green-700">VEGPack</span>
//       </div>

//       <div className="flex gap-6 items-center">
//         <Link to="/" className="hover:underline">Home</Link>
//         <Link to="/packages" className="hover:underline">Packages</Link>
//         <Link to="/vegetables" className="hover:underline">Vegetables</Link>
//         <button onClick={handleFarmerClick} className="hover:underline font-semibold">
//           Add Product
//         </button>
//         {/* Show Admin button only if logged in and role is admin */}
//         {isLoggedIn && user?.role === "admin" && (
//           <button onClick={handleAdminClick} className="hover:underline font-semibold">
//             Admin
//           </button>
//         )}
//       </div>

//       <div className="flex items-center gap-4">
//         {!isLoggedIn ? (
//           <Link to="/register" className="px-4 py-2 bg-white text-green-700 rounded-md font-semibold">
//             Sign In
//           </Link>
//         ) : (
//           <>
//             <Link to="/cart" className="relative text-xl">
//               <FaShoppingCart />
//             </Link>
//             <Link to="/profile" className="flex items-center gap-2 text-xl">
//               <FaUser />
//               <span className="text-sm font-semibold">{user.name || user.email}</span>
//             </Link>
//             <button
//               onClick={() => {
//                 logout();
//                 navigate("/login");
//               }}
//               className="ml-2 px-3 py-1 bg-red-600 text-white rounded-md"
//             >
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

// import { Link, useNavigate } from "react-router-dom";
// import { FaShoppingCart, FaUser } from "react-icons/fa";
// import { useAuth } from "../AuthContext";

// export default function Navbar() {
//   const { user, isLoggedIn, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleAddProductClick = () => {
//     if (!isLoggedIn) {
//       const answer = window.confirm("You must be logged in as a farmer to add products. Register now?");
//       if (answer) navigate("/register");
//     } else if (user.role === "farmer") {
//       navigate("/farmer"); // farmer dashboard or add product page
//     } else {
//       alert("Only farmers can add products.");
//     }
//   };

//   const handleAdminClick = () => {
//     if (user?.role === "admin") {
//       navigate("/admin");
//     }
//   };

//   return (
//     <nav className="flex items-center justify-between px-6 py-4 bg-green-200 text-black">
//       <div className="flex items-center space-x-2">
//         <span className="text-2xl font-bold text-green-700">VEGPack</span>
//       </div>

//       <div className="flex gap-6 items-center">
//         <Link to="/" className="hover:underline">Home</Link>
//         <Link to="/packages" className="hover:underline">Packages</Link>
//         <Link to="/vegetables" className="hover:underline">Vegetables</Link>

//         {/* Show Add Product only for logged-in farmers */}
//         {isLoggedIn && user?.role === "farmer" && (
//           <button onClick={handleAddProductClick} className="hover:underline font-semibold">
//             Add Product
//           </button>
//         )}

//         {/* Show Admin button only if logged in and role is admin */}
//         {isLoggedIn && user?.role === "admin" && (
//           <button onClick={handleAdminClick} className="hover:underline font-semibold">
//             Admin
//           </button>
//         )}
//       </div>

//       <div className="flex items-center gap-4">
//         {!isLoggedIn ? (
//           <Link to="/register" className="px-4 py-2 bg-white text-green-700 rounded-md font-semibold">
//             Sign In
//           </Link>
//         ) : (
//           <>
//             <Link to="/cart" className="relative text-xl">
//               <FaShoppingCart />
//             </Link>
//             <Link to="/profile" className="flex items-center gap-2 text-xl">
//               <FaUser />
//               <span className="text-sm font-semibold">{user.name || user.email}</span>
//             </Link>
//             <button
//               onClick={() => {
//                 logout();
//                 navigate("/login");
//               }}
//               className="ml-2 px-3 py-1 bg-red-600 text-white rounded-md"
//             >
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }


// import { Link, useNavigate } from "react-router-dom";
// import { FaShoppingCart, FaUser } from "react-icons/fa";
// import { useAuth } from "../AuthContext";

// export default function Navbar() {
//   const { user, isLoggedIn, logout } = useAuth();
//   const navigate = useNavigate();

  

//   const handleAdminClick = () => {
//     if (user?.role === "admin") {
//       navigate("/admin");
//     }
//   };

//   return (
//     <nav className="flex items-center justify-between px-6 py-4 bg-green-200 text-black">
//       <div className="flex items-center space-x-2">
//         <span className="text-2xl font-bold text-green-700">VEGPack</span>
//       </div>

//       <div className="flex gap-6 items-center">
//         <Link to="/" className="hover:underline">Home</Link>
//         <Link to="/packages" className="hover:underline">Packages</Link>
//         <Link to="/vegetables" className="hover:underline">Vegetables</Link>



//         {/* Show Admin button only if logged in and role is admin */}
//         {isLoggedIn && user?.role === "admin" && (
//           <button onClick={handleAdminClick} className="hover:underline font-semibold">
//             Admin
//           </button>
//         )}
//       </div>

//       <div className="flex items-center gap-4">
//         {!isLoggedIn ? (
//           <>
//             <Link to="/register" className="px-4 py-2 bg-white text-green-700 rounded-md font-semibold">
//               Sign Up
//             </Link>
//             <Link to="/login" className="px-4 py-2 bg-green-600 text-white rounded-md font-semibold">
//               Log In
//             </Link>
//           </>
//         ) : (
//           <>
//             <Link to="/cart" className="relative text-xl">
//               <FaShoppingCart />
//             </Link>
//             <Link to="/profile" className="flex items-center gap-2 text-xl">
//               <FaUser />
//               <span className="text-sm font-semibold">{user.name || user.email}</span>
//             </Link>
//             <button
//               onClick={() => {
//                 logout();
//                 navigate("/login");
//               }}
//               className="ml-2 px-3 py-1 bg-red-600 text-white rounded-md"
//             >
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }



// import { Link, useNavigate } from "react-router-dom";
// import { FaShoppingCart, FaUser } from "react-icons/fa";
// import { useAuth } from "../AuthContext";

// export default function Navbar() {
//   const { user, isLoggedIn, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleAdminClick = () => {
//     if (user?.role === "admin") {
//       navigate("/admin");
//     }
//   };

//   return (
//     <nav className="bg-green-200 text-black shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Logo */}
//           <div className="flex items-center space-x-2">
//             <Link to="/" className="text-2xl font-bold text-green-700">
//               VEGPack
//             </Link>
//           </div>

//           {/* Navigation Links */}
//           <div className="hidden md:flex items-center gap-6">
//             <Link to="/" className="hover:underline font-medium">Home</Link>
//             <Link to="/packages" className="hover:underline font-medium">Packages</Link>
//             <Link to="/vegetables" className="hover:underline font-medium">Vegetables</Link>

//             {/* Admin Button */}
//             {isLoggedIn && user?.role === "admin" && (
//               <button
//                 onClick={handleAdminClick}
//                 className="hover:underline font-semibold text-green-800"
//               >
//                 Admin
//               </button>
//             )}
//           </div>

//           {/* User / Auth Buttons */}
//           <div className="flex items-center gap-4">
//             {!isLoggedIn ? (
//               <>
//                 <Link
//                   to="/register"
//                   className="px-4 py-2 bg-white text-green-700 rounded-md font-semibold hover:bg-green-50 transition"
//                 >
//                   Sign Up
//                 </Link>
//                 <Link
//                   to="/login"
//                   className="px-4 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition"
//                 >
//                   Log In
//                 </Link>
//               </>
//             ) : (
//               <>
//                 {/* Cart Icon */}
//                 <Link
//                   to="/cart"
//                   className="relative text-xl hover:text-green-800 transition"
//                 >
//                   <FaShoppingCart />
//                 </Link>

//                 {/* Profile */}
//                 <Link
//                   to="/profile"
//                   className="flex items-center gap-2 text-xl hover:text-green-800 transition"
//                 >
//                   <FaUser />
//                   <span className="text-sm font-semibold truncate max-w-[100px]">
//                     {user.name || user.email}
//                   </span>
//                 </Link>

//                 {/* Logout */}
//                 <button
//                   onClick={() => {
//                     logout();
//                     navigate("/login");
//                   }}
//                   className="ml-2 px-3 py-1 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition"
//                 >
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Placeholder */}
//           {/* Optional: Add a hamburger menu for mobile responsiveness */}
//         </div>
//       </div>
//     </nav>
//   );
// }


// // src/components/Navbar.jsx
// import { Link, useNavigate } from "react-router-dom";
// import { FaShoppingCart, FaUser } from "react-icons/fa";
// import { useAuth } from "../AuthContext";
// import { useEffect, useState } from "react";

// export default function Navbar() {
//   const { user, isLoggedIn, logout } = useAuth();
//   const navigate = useNavigate();

//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10); // 10px மேல் scroll ஆனாலே change
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleAdminClick = () => {
//     if (user?.role === "admin") {
//       navigate("/admin");
//     }
//   };

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
//         scrolled
//           ? "bg-white/90 backdrop-blur border-b border-green-100 shadow-md"
//           : "bg-green-200"
//       } text-black`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Logo */}
//           <div className="flex items-center space-x-2">
//             <Link
//               to="/"
//               className="text-2xl font-bold"
//               style={{ color: scrolled ? "#166534" : "#15803d" }} // dark green on scroll
//             >
//               VEGPack
//             </Link>
//           </div>

//           {/* Navigation Links */}
//           <div className="hidden md:flex items-center gap-6">
//             <Link
//               to="/"
//               className="hover:underline font-medium text-sm sm:text-base"
//             >
//               Home
//             </Link>
//             <Link
//               to="/packages"
//               className="hover:underline font-medium text-sm sm:text-base"
//             >
//               Packages
//             </Link>
//             <Link
//               to="/vegetables"
//               className="hover:underline font-medium text-sm sm:text-base"
//             >
//               Vegetables
//             </Link>

//             {/* Admin Button */}
//             {isLoggedIn && user?.role === "admin" && (
//               <button
//                 onClick={handleAdminClick}
//                 className="hover:underline font-semibold text-green-800 text-sm sm:text-base"
//               >
//                 Admin
//               </button>
//             )}
//           </div>

//           {/* User / Auth Buttons */}
//           <div className="flex items-center gap-4">
//             {!isLoggedIn ? (
//               <>
//                 <Link
//                   to="/register"
//                   className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white text-green-700 rounded-md text-sm sm:text-base font-semibold hover:bg-green-50 transition"
//                 >
//                   Sign Up
//                 </Link>
//                 <Link
//                   to="/login"
//                   className="px-3 py-1.5 sm:px-4 sm:py-2 bg-green-600 text-white rounded-md text-sm sm:text-base font-semibold hover:bg-green-700 transition"
//                 >
//                   Log In
//                 </Link>
//               </>
//             ) : (
//               <>
//                 {/* Cart Icon */}
//                 <Link
//                   to="/cart"
//                   className="relative text-xl hover:text-green-800 transition"
//                 >
//                   <FaShoppingCart />
//                 </Link>

//                 {/* Profile */}
//                 <Link
//                   to="/profile"
//                   className="flex items-center gap-2 text-xl hover:text-green-800 transition"
//                 >
//                   <FaUser />
//                   <span className="text-sm font-semibold truncate max-w-[100px]">
//                     {user.name || user.email}
//                   </span>
//                 </Link>

//                 {/* Logout */}
//                 <button
//                   onClick={() => {
//                     logout();
//                     navigate("/login");
//                   }}
//                   className="ml-1 sm:ml-2 px-3 py-1 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition"
//                 >
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>

//           {/* (Optional) mobile hamburger menu later add பண்ணலாம் */}
//         </div>
//       </div>
//     </nav>
//   );
// }


// // src/components/Navbar.jsx
// import { Link, useNavigate } from "react-router-dom";
// import { FaShoppingCart, FaUser } from "react-icons/fa";
// import { useAuth } from "../AuthContext";
// import { useEffect, useState } from "react";

// export default function Navbar() {
//   const { user, isLoggedIn, logout } = useAuth();
//   const navigate = useNavigate();

//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10); // 10px மேலே scroll ஆனால் state true
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleAdminClick = () => {
//     if (user?.role === "admin") {
//       navigate("/admin");
//     }
//   };

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
//         scrolled ? "bg-green-700 shadow-md" : "bg-green-200"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Logo */}
//           <div className="flex items-center space-x-2">
//             <Link
//               to="/"
//               className={`text-2xl font-bold ${
//                 scrolled ? "text-white" : "text-green-800"
//               }`}
//             >
//               VEGPack
//             </Link>
//           </div>

//           {/* Links */}
//           <div className="hidden md:flex items-center gap-6">
//             <Link
//               to="/"
//               className={`hover:underline font-medium text-sm sm:text-base ${
//                 scrolled ? "text-white" : "text-black"
//               }`}
//             >
//               Home
//             </Link>
//             <Link
//               to="/packages"
//               className={`hover:underline font-medium text-sm sm:text-base ${
//                 scrolled ? "text-white" : "text-black"
//               }`}
//             >
//               Packages
//             </Link>
//             <Link
//               to="/vegetables"
//               className={`hover:underline font-medium text-sm sm:text-base ${
//                 scrolled ? "text-white" : "text-black"
//               }`}
//             >
//               Vegetables
//             </Link>

//             {isLoggedIn && user?.role === "admin" && (
//               <button
//                 onClick={handleAdminClick}
//                 className={`hover:underline font-semibold text-sm sm:text-base ${
//                   scrolled ? "text-cyan-200" : "text-green-900"
//                 }`}
//               >
//                 Admin
//               </button>
//             )}
//           </div>

//           {/* Auth / Profile */}
//           <div className="flex items-center gap-4">
//             {!isLoggedIn ? (
//               <>
//                 <Link
//                   to="/register"
//                   className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base font-semibold transition ${
//                     scrolled
//                       ? "bg-white text-green-700 hover:bg-gray-100"
//                       : "bg-white text-green-700 hover:bg-green-50"
//                   }`}
//                 >
//                   Sign Up
//                 </Link>
//                 <Link
//                   to="/login"
//                   className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base font-semibold transition ${
//                     scrolled
//                       ? "bg-green-900 text-white hover:bg-green-800"
//                       : "bg-green-600 text-white hover:bg-green-700"
//                   }`}
//                 >
//                   Log In
//                 </Link>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/cart"
//                   className={`relative text-xl transition ${
//                     scrolled ? "text-white hover:text-cyan-200" : "text-black hover:text-green-800"
//                   }`}
//                 >
//                   <FaShoppingCart />
//                 </Link>

//                 <Link
//                   to="/profile"
//                   className={`flex items-center gap-2 text-xl transition ${
//                     scrolled ? "text-white hover:text-cyan-200" : "text-black hover:text-green-800"
//                   }`}
//                 >
//                   <FaUser />
//                   <span className="text-sm font-semibold truncate max-w-[100px]">
//                     {user.name || user.email}
//                   </span>
//                 </Link>

//                 <button
//                   onClick={() => {
//                     logout();
//                     navigate("/login");
//                   }}
//                   className={`ml-1 sm:ml-2 px-3 py-1 rounded-md text-sm font-medium transition ${
//                     scrolled
//                       ? "bg-red-500 text-white hover:bg-red-600"
//                       : "bg-red-600 text-white hover:bg-red-700"
//                   }`}
//                 >
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// import { Link, useNavigate } from "react-router-dom";
// import { FaShoppingCart, FaUser } from "react-icons/fa";
// import { useAuth } from "../AuthContext";
// import { useEffect, useState } from "react";

// export default function Navbar() {
//   const { user, isLoggedIn, logout } = useAuth();
//   const navigate = useNavigate();

//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleAdminClick = () => {
//     if (user?.role === "admin") {
//       navigate("/admin");
//     }
//   };

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
//         scrolled ? "bg-green-600 shadow-md" : "bg-green-200"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Logo */}
//           <div className="flex items-center space-x-2">
//             <Link
//               to="/"
//               className={`text-2xl font-bold ${
//                 scrolled ? "text-white" : "text-green-800"
//               }`}
//             >
//               VEGPack
//             </Link>
//           </div>

//           {/* Links */}
//           <div className="hidden md:flex items-center gap-6">
//             <Link
//               to="/"
//               className={`hover:underline font-medium text-sm sm:text-base ${
//                 scrolled ? "text-white" : "text-gray-900"
//               }`}
//             >
//               Home
//             </Link>
//             <Link
//               to="/packages"
//               className={`hover:underline font-medium text-sm sm:text-base ${
//                 scrolled ? "text-white" : "text-gray-900"
//               }`}
//             >
//               Packages
//             </Link>
//             <Link
//               to="/vegetables"
//               className={`hover:underline font-medium text-sm sm:text-base ${
//                 scrolled ? "text-white" : "text-gray-900"
//               }`}
//             >
//               Vegetables
//             </Link>

//             {isLoggedIn && user?.role === "admin" && (
//               <button
//                 onClick={handleAdminClick}
//                 className={`hover:underline font-semibold text-sm sm:text-base ${
//                   scrolled ? "text-cyan-200" : "text-green-900"
//                 }`}
//               >
//                 Admin
//               </button>
//             )}
//           </div>

//           {/* Auth / Profile */}
//           <div className="flex items-center gap-4">
//             {!isLoggedIn ? (
//               <>
//                 <Link
//                   to="/register"
//                   className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base font-semibold transition ${
//                     scrolled
//                       ? "bg-white text-green-700 hover:bg-gray-100"
//                       : "bg-white text-green-700 hover:bg-green-50"
//                   }`}
//                 >
//                   Sign Up
//                 </Link>
//                 <Link
//                   to="/login"
//                   className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base font-semibold transition ${
//                     scrolled
//                       ? "bg-green-900 text-white hover:bg-green-800"
//                       : "bg-green-600 text-white hover:bg-green-700"
//                   }`}
//                 >
//                   Log In
//                 </Link>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/cart"
//                   className={`relative text-xl transition ${
//                     scrolled
//                       ? "text-white hover:text-cyan-200"
//                       : "text-gray-900 hover:text-green-800"
//                   }`}
//                 >
//                   <FaShoppingCart />
//                 </Link>

//                 <Link
//                   to="/profile"
//                   className={`flex items-center gap-2 text-xl transition ${
//                     scrolled
//                       ? "text-white hover:text-cyan-200"
//                       : "text-gray-900 hover:text-green-800"
//                   }`}
//                 >
//                   <FaUser />
//                   <span className="text-sm font-semibold truncate max-w-[100px]">
//                     {user.name || user.email}
//                   </span>
//                 </Link>

//                 <button
//                   onClick={() => {
//                     logout();
//                     navigate("/login");
//                   }}
//                   className={`ml-1 sm:ml-2 px-3 py-1 rounded-md text-sm font-medium transition ${
//                     scrolled
//                       ? "bg-red-500 text-white hover:bg-red-600"
//                       : "bg-red-600 text-white hover:bg-red-700"
//                   }`}
//                 >
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }


// // src/components/Navbar.jsx
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { FaShoppingCart, FaUser } from "react-icons/fa";
// import { useAuth } from "../AuthContext";
// import { useEffect, useState } from "react";
// import logo from "../assets/Pasted image (2).png"

// export default function Navbar() {
//   const { user, isLoggedIn, logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [scrolled, setScrolled] = useState(false);

//   const isHome = location.pathname === "/";

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // ✅ Home page + top → light green, இல்லையென்றால் dark green
//   const isDark = !(isHome && !scrolled); // dark nav state
//   const navBgClass = isDark ? "bg-green-600" :  "bg-[#75ca95ff]" ;
//   const handleAdminClick = () => {
//     if (user?.role === "admin") {
//       navigate("/admin");
//     }
//   };

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${navBgClass} ${
//         isDark ? "shadow-md" : ""
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Logo */}
           
//           <div className="flex items-center space-x-2">
//              <img src={logo} style={{width:"70px"}}></img>
//             <Link
//               to="/"
//               className={`text-2xl font-bold ${
//                 isDark ? "text-white" : "text-green-800"
//               }`}
//             >
//               VEGPack
//             </Link>
//           </div>

//           {/* Links */}
//           <div className="hidden md:flex items-center gap-6">
//             <Link
//               to="/"
//               className={`hover:underline font-medium text-sm sm:text-base ${
//                 isDark ? "text-white" : "text-gray-900"
//               }`}
//             >
//               Home
//             </Link>
//             <Link
//               to="/packages"
//               className={`hover:underline font-medium text-sm sm:text-base ${
//                 isDark ? "text-white" : "text-gray-900"
//               }`}
//             >
//               Packages
//             </Link>
//             <Link
//               to="/vegetables"
//               className={`hover:underline font-medium text-sm sm:text-base ${
//                 isDark ? "text-white" : "text-gray-900"
//               }`}
//             >
//               Vegetables
//             </Link>

//             {isLoggedIn && user?.role === "admin" && (
//               <button
//                 onClick={handleAdminClick}
//                 className={`hover:underline font-semibold text-sm sm:text-base ${
//                   isDark ? "text-white" : "text-green-900"
//                 }`}
//               >
//                 Admin
//               </button>
//             )}
//           </div>

//           {/* Auth / Profile */}
//           <div className="flex items-center gap-4">
//             {!isLoggedIn ? (
//               <>
//                 <Link
//                   to="/register"
//                   className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base font-semibold transition ${
//                     isDark
//                       ? "bg-white text-green-700 hover:bg-gray-100"
//                       : "bg-white text-green-700 hover:bg-green-50"
//                   }`}
//                 >
//                   Sign Up
//                 </Link>
//                 <Link
//                   to="/login"
//                   className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base font-semibold transition ${
//                     isDark
//                       ? "bg-green-900 text-white hover:bg-green-800"
//                       : "bg-green-600 text-white hover:bg-green-700"
//                   }`}
//                 >
//                   Log In
//                 </Link>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/cart"
//                   className={`relative text-xl transition ${
//                     isDark
//                       ? "text-white hover:text-cyan-200"
//                       : "text-gray-900 hover:text-green-800"
//                   }`}
//                 >
//                   <FaShoppingCart />
//                 </Link>

//                 <Link
//                   to="/profile"
//                   className={`flex items-center gap-2 text-xl transition ${
//                     isDark
//                       ? "text-white hover:text-cyan-200"
//                       : "text-gray-900 hover:text-green-800"
//                   }`}
//                 >
//                   <FaUser />
//                   <span className="text-sm font-semibold truncate max-w-[100px]">
//                     {user.name || user.email}
//                   </span>
//                 </Link>

//                 <button
//                   onClick={() => {
//                     logout();
//                     navigate("/login");
//                   }}
//                   className={`ml-1 sm:ml-2 px-3 py-1 rounded-md text-sm font-medium transition ${
//                     isDark
//                       ? "bg-red-500 text-white hover:bg-red-600"
//                       : "bg-red-600 text-white hover:bg-red-700"
//                   }`}
//                 >
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// src/components/Navbar.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useAuth } from "../AuthContext";
import { useEffect, useState } from "react";
import logo from "../assets/Pasted image (2).png";

export default function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Home + top → light bg, இல்லையென்றால் dark green
  const isHomeTop = isHome && !scrolled;
  const bgColor = isHomeTop ? "#e3f1e5" : "#61b686ff";

  const handleAdminClick = () => {
    if (user?.role === "admin") {
      navigate("/admin");
    }
  };

  return (
    <nav
      style={{ backgroundColor: bgColor }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        !isHomeTop ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={logo} style={{ width: "70px" }} alt="VegPack logo" />
            <Link to="/" className="text-2xl font-bold text-green-900">
              VEGPack
            </Link>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="hover:underline font-medium text-sm sm:text-base text-gray-900"
            >
              Home
            </Link>
            <Link
              to="/packages"
              className="hover:underline font-medium text-sm sm:text-base text-gray-900"
            >
              Packages
            </Link>
            <Link
              to="/vegetables"
              className="hover:underline font-medium text-sm sm:text-base text-gray-900"
            >
              Vegetables
            </Link>

            {isLoggedIn && user?.role === "admin" && (
              <button
                onClick={handleAdminClick}
                className="hover:underline font-semibold text-sm sm:text-base text-green-900"
              >
                Admin
              </button>
            )}
          </div>

          {/* Auth / Profile */}
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/register"
                  className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base font-semibold bg-white text-green-700 hover:bg-green-50 transition"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base font-semibold bg-green-600 text-white hover:bg-green-700 transition"
                >
                  Log In
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/cart"
                  className="relative text-xl text-gray-900 hover:text-green-800 transition"
                >
                  <FaShoppingCart />
                </Link>

                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-xl text-gray-900 hover:text-green-800 transition"
                >
                  <FaUser />
                  <span className="text-sm font-semibold truncate max-w-[100px]">
                    {user.name || user.email}
                  </span>
                </Link>

                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="ml-1 sm:ml-2 px-3 py-1 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
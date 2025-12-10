// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
// import axios from "axios";
// import jwt_decode from "jwt-decode";
// import { GoogleLogin } from "@react-oauth/google";

// export default function LogIn() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [validationError, setValidationError] = useState({});

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setValidationError({ ...validationError, [e.target.name]: "" });
//     setError("");
//   };

//   const validate = () => {
//     const errors = {};
//     if (!form.email.trim()) errors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(form.email))
//       errors.email = "Please enter a valid email";
//     if (!form.password.trim()) errors.password = "Password is required";
//     return errors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errors = validate();
//     if (Object.keys(errors).length > 0) {
//       setValidationError(errors);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       const res = await axios.post("http://localhost:5000/api/auth/login", form);
//       const { token, user } = res.data;

//       if (!token) {
//         setError(res.data?.message || "Invalid credentials");
//         return;
//       }

      

//       // SAVE LOGIN DETAILS
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));
//       localStorage.setItem("role", JSON.stringify([user?.role || "customer"]));
     

//       // REDIRECT BASED ON ROLE
//       if (user.role === "admin") navigate("/admin/dashboard");
//       else if (user.role === "farmer") navigate("/farmer/dashboard");
//       else navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid email or password!");
//     } finally {
//       setLoading(false);
//     }
//   };


//   const handleGoogleSuccess = async (credentialResponse) => {
//     try {
//       const decoded = jwt_decode(credentialResponse.credential);
//       const { email, name, sub: googleId } = decoded;

//       const res = await axios.post("http://localhost:5000/api/auth/google-login", {
//         email,
//         name,
//         googleId,
//       });

//       const { token, user } = res.data;

//      localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(user));
//     localStorage.setItem("role", JSON.stringify([user?.role || "customer"]));

//       if (user?.role === "admin") navigate("/admin/dashboard");
//       else if (user?.role === "farmer") navigate("/farmer/dashboard");
//       else navigate("/");
//     } catch (err) {
//       console.error("Google login error:", err);
//       setError("Google login failed");
//     }
//   };


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-green-100">
//       <div
//         className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row w-[80%] max-w-4xl overflow-hidden"
//         style={{
//           marginTop: "170px",
//           marginBottom: "400px",
//           width: "700px",
//           height: "500px",
//         }}
//       >
//         <div className="w-full md:p-12">
//           <h3 className="text-gray-600 text-sm uppercase">Welcome Back</h3>
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">
//             Log In
//           </h2>

//           {error && (
//             <p className="text-red-500 bg-red-100 border border-red-300 p-2 rounded mt-3">
//               {error}
//             </p>
//           )}

//           <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
//             <div>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email Address"
//                 value={form.email}
//                 onChange={handleChange}
//                 style={{ width: "400px", borderRadius: "10px" }}
//                 className="w-full border-b border-gray-400 focus:border-green-600 outline-none py-2"
//               />
//               {validationError.email && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {validationError.email}
//                 </p>
//               )}
//             </div>

//             <div>
//               <input
//                  type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={handleChange}
//                 style={{ width: "400px", borderRadius: "10px" }}
//                 className="w-full border-b border-gray-400 focus:border-green-600 outline-none py-2"
//               />
//               {validationError.password && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {validationError.password}
//                 </p>
//               )}

//               <div className="flex justify-end mt-2">
//                 <Link
//                   to="/forgot"
//                   className="text-sm text-green-700 hover:underline"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
//               style={{ width: "400px", borderRadius: "10px" }}
//               disabled={loading}
//             >
//               {loading ? "Logging In..." : "Log In"}
//             </button>

//             {/* Google Login */}
//             <div className="flex justify-center mt-4">
//               <GoogleLogin
//                 onSuccess={handleGoogleSuccess}
//                 onError={() => setError("Google login failed")}
//               />
//             </div>

            

//             <div className="mt-4" style={{ marginLeft: "100px" }}>
//               <p className="text-sm text-gray-700">
//                 Don't have an account?{" "}
//                 <Link to="/register" className="text-green-700 font-semibold">
//                   Sign up
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>

//         <div className="hidden md:flex items-center justify-center">
//            <svg width="100%" height="100%" viewBox="0 0 592 1558" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full" style={{ width: "300px" }}>
//            <path d="M566.607 0C580.415 0 591.607 11.1929 591.607 25V1538.78C591.607 1549.4 583.004 1558 572.391 1558H159.131C146.978 1558 136.586 1549.26 134.501 1537.29L0.37014 766.881C-0.134382 763.983 -0.123553 761.019 0.402121 758.125L134.378 20.5322C136.538 8.6429 146.892 0 158.976 0H566.607Z" fill="url(#paint0_linear_36_89)" />
//            <defs>
//               <linearGradient id="paint0_linear_36_89" x1="295.607" y1="0" x2="295.607" y2="1558" gradientUnits="userSpaceOnUse">
//                <stop stopColor="#078405" stopOpacity="0.78" />
//                <stop offset="0.456731" stopColor="#BBD819" />
//                 <stop offset="0.668269" stopColor="#82C42C" stopOpacity="0.84" />
//                 <stop offset="1" stopColor="#078405" stopOpacity="0.98" />
//                </linearGradient>
//              </defs>
//            </svg>
//         </div>
//       </div>
//     </div>
//   );
// }



// // src/pages/Login.jsx
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { GoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import jwt_decode from "jwt-decode";
// import { useAuth } from "../AuthContext";

// export default function Login() {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", form);
//       const { user, token } = res.data;

//       login(user, token);

//       if (user.role === "admin") navigate("/admin/dashboard");
//       else if (user.role === "farmer") navigate("/farmer/dashboard");
//       else navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid email or password!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSuccess = async (credentialResponse) => {
//     try {
//       const decoded = jwt_decode(credentialResponse.credential);
//       const { email, name, sub: googleId } = decoded;

//       const res = await axios.post("http://localhost:5000/api/auth/google-login", { email, name, googleId });
//       const { user, token } = res.data;

//       login(user, token);

//       if (user.role === "admin") navigate("/admin/dashboard");
//       else if (user.role === "farmer") navigate("/farmer/dashboard");
//       else navigate("/");
//     } catch (err) {
//       setError("Google login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-green-100">
//       <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row w-[80%] max-w-4xl overflow-hidden mt-24" style={{ height: "500px" }}>
//         {/* Left Form */}
//         <div className="w-full md:w-1/2 p-12">
//           <h3 className="text-gray-600 text-sm uppercase">Welcome Back</h3>
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">Log In</h2>

//           {error && (
//             <p className="text-red-500 bg-red-100 border border-red-300 p-2 rounded mt-3">{error}</p>
//           )}

//           <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email Address"
//               value={form.email}
//               onChange={handleChange}
//               className="w-full border-b border-gray-400 focus:border-green-600 outline-none py-2"
//             />

//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={handleChange}
//                 className="w-full border-b border-gray-400 focus:border-green-600 outline-none py-2 pr-10"
//               />
//               <div
//                 className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </div>
//             </div>

//             <div className="flex justify-end mt-2">
//               <Link to="/forgot" className="text-sm text-green-700 hover:underline">Forgot password?</Link>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
//               disabled={loading}
//             >
//               {loading ? "Logging In..." : "Log In"}
//             </button>

//             <div className="flex justify-center mt-4">
//               <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError("Google login failed")} />
//             </div>

//             <p className="text-sm text-gray-700 mt-4 text-center">
//               Don't have an account? <Link to="/register" className="text-green-700 font-semibold">Sign up</Link>
//             </p>
//           </form>
//         </div>

//         {/* Right Graphic */}
//         <div className="hidden md:flex md:w-1/2 items-center justify-center">
//           <svg width="100%" height="100%" viewBox="0 0 592 1558" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
//             <path d="M566.607 0C580.415 0 591.607 11.1929 591.607 25V1538.78C591.607 1549.4 583.004 1558 572.391 1558H159.131C146.978 1558 136.586 1549.26 134.501 1537.29L0.37014 766.881C-0.134382 763.983 -0.123553 761.019 0.402121 758.125L134.378 20.5322C136.538 8.6429 146.892 0 158.976 0H566.607Z" fill="url(#paint0_linear)" />
//             <defs>
//               <linearGradient id="paint0_linear" x1="295.607" y1="0" x2="295.607" y2="1558" gradientUnits="userSpaceOnUse">
//                 <stop stopColor="#078405" stopOpacity="0.78"/>
//                 <stop offset="0.456731" stopColor="#BBD819"/>
//                 <stop offset="0.668269" stopColor="#82C42C" stopOpacity="0.84"/>
//                 <stop offset="1" stopColor="#078405" stopOpacity="0.98"/>
//               </linearGradient>
//             </defs>
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { GoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import jwt_decode from "jwt-decode";
// import { useAuth } from "../AuthContext";

// export default function Login() {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", form);
//       const { user, token } = res.data;

//       // Persist login in AuthContext + localStorage
//       login(user, token);

//       if (user.role === "admin") navigate("/admin/dashboard");
//       else if (user.role === "farmer") navigate("/farmer/dashboard");
//       else navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid email or password!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSuccess = async (credentialResponse) => {
//     try {
//       const decoded = jwt_decode(credentialResponse.credential);
//       const { email, name, sub: googleId } = decoded;

//       const res = await axios.post("http://localhost:5000/api/auth/google-login", { email, name, googleId });
//       const { user, token } = res.data;

//       login(user, token);

//       if (user.role === "admin") navigate("/admin/dashboard");
//       else if (user.role === "farmer") navigate("/farmer/dashboard");
//       else navigate("/");
//     } catch (err) {
//       setError("Google login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-green-100">
//       <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row w-[80%] max-w-4xl overflow-hidden mt-24" style={{ height: "500px" }}>
//         {/* Left Form */}
//         <div className="w-full md:w-1/2 p-12">
//           <h3 className="text-gray-600 text-sm uppercase">Welcome Back</h3>
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">Log In</h2>

//           {error && (
//             <p className="text-red-500 bg-red-100 border border-red-300 p-2 rounded mt-3">{error}</p>
//           )}

//           <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email Address"
//               value={form.email}
//               onChange={handleChange}
//               className="w-full border-b border-gray-400 focus:border-green-600 outline-none py-2"
//             />

//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={handleChange}
//                 className="w-full border-b border-gray-400 focus:border-green-600 outline-none py-2 pr-10"
//               />
//               <div
//                 className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </div>
//             </div>

//             <div className="flex justify-end mt-2">
//               <Link to="/forgot" className="text-sm text-green-700 hover:underline">Forgot password?</Link>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
//               disabled={loading}
//             >
//               {loading ? "Logging In..." : "Log In"}
//             </button>

//             <div className="flex justify-center mt-4">
//               <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError("Google login failed")} />
//             </div>

//             <p className="text-sm text-gray-700 mt-4 text-center">
//               Don't have an account? <Link to="/register" className="text-green-700 font-semibold">Sign up</Link>
//             </p>
//           </form>
//         </div>

//         {/* Right Graphic */}
//         <div className="hidden md:flex md:w-1/2 items-center justify-center">
//           <svg width="100%" height="100%" viewBox="0 0 592 1558" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
//             <path d="M566.607 0C580.415 0 591.607 11.1929 591.607 25V1538.78C591.607 1549.4 583.004 1558 572.391 1558H159.131C146.978 1558 136.586 1549.26 134.501 1537.29L0.37014 766.881C-0.134382 763.983 -0.123553 761.019 0.402121 758.125L134.378 20.5322C136.538 8.6429 146.892 0 158.976 0H566.607Z" fill="url(#paint0_linear)" />
//             <defs>
//               <linearGradient id="paint0_linear" x1="295.607" y1="0" x2="295.607" y2="1558" gradientUnits="userSpaceOnUse">
//                 <stop stopColor="#078405" stopOpacity="0.78"/>
//                 <stop offset="0.456731" stopColor="#BBD819"/>
//                 <stop offset="0.668269" stopColor="#82C42C" stopOpacity="0.84"/>
//                 <stop offset="1" stopColor="#078405" stopOpacity="0.98"/>
//               </linearGradient>
//             </defs>
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// }

// // src/pages/Login.jsx
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { GoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import jwt_decode from "jwt-decode";
// import { useAuth } from "../AuthContext";


// export default function Login() {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError("");
//   };

//   // Email/password login
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setLoading(true);
//   //   try {
//   //     const res = await axios.post("http://localhost:5000/api/auth/login", form);
//   //     const { user: userData, token } = res.data;

//   //     await login(userData, token); // AuthContext handles guest cart sync

//   //     // Redirect based on role
//   //     if (userData.role === "admin") navigate("/admin");
//   //     else if (userData.role === "farmer") navigate("/farmer-dashboard");
//   //     else navigate("/");
//   //   } catch (err) {
//   //     setError(err.response?.data?.message || "Invalid email or password!");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   try {
//     const res = await axios.post(
//       "http://localhost:5000/api/auth/login",
//       form,
//       { withCredentials: true } // ✅ important
//     );
//     const { user: userData } = res.data;

//     await login(userData); // ✅ no token needed

//     if (userData.role === "admin") navigate("/admin");
//     else if (userData.role === "farmer") navigate("/farmer-dashboard");
//     else navigate("/");
//   } catch (err) {
//     setError(err.response?.data?.message || "Invalid email or password!");
//   } finally {
//     setLoading(false);
//   }
// };
//   // // Google login// src/pages/Login.jsx

// // const handleGoogleSuccess = async (credentialResponse) => {
// //   try {
// //     const decoded = jwt_decode(credentialResponse.credential);
// //     const { email, name, sub: googleId } = decoded;

// //     const res = await axios.post(
// //       "http://localhost:5000/api/auth/google-login",
// //       { email, name, googleId },
// //       { withCredentials: true }           // ✅ important
// //     );

// //     const { user: userData } = res.data;

// //     await login(userData);               // ✅ cookie already set, token pass panna thevai illa

// //     if (userData.role === "admin") navigate("/admin");
// //     else if (userData.role === "farmer") navigate("/farmer-dashboard");
// //     else navigate("/");
// //   } catch (err) {
// //     console.error("Google login error:", err);
// //     setError(
// //       err.response?.data?.message || "Google login failed"
// //     );
// //   }
// // };

// const handleGoogleSuccess = async (credentialResponse) => {
//   try {
//     const decoded = jwt_decode(credentialResponse.credential);
//     const { email, name, sub: googleId } = decoded;

//     const res = await axios.post(
//       "http://localhost:5000/api/auth/google-login",
//       { email, name, googleId },
//       { withCredentials: true }          // ✅ cookie
//     );

//     const { user: userData } = res.data;
//     await login(userData);               // ✅ AuthContext

//     if (userData.role === "admin") navigate("/admin");
//     else if (userData.role === "farmer") navigate("/farmer-dashboard");
//     else navigate("/");
//   } catch (err) {
//     console.error("Google login error:", err);
//     setError(err.response?.data?.message || "Google login failed");
//   }
// };



//   return (
//     <div className="max-h-screen flex items-center justify-center bg-green-100" style={{paddingTop:"150px",paddingBottom:"50px"}}>
//       <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row w-[80%] max-w-4xl overflow-hidden " style={{ height: "500px" }}>
//         {/* Left Form */}
//         <div className="w-full md:w-1/2 " style={{paddingLeft:"30px",paddingTop:"40px"}}>
//           <h3 className="text-gray-600 text-sm uppercase">Welcome Back</h3>
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">Log In</h2>

//           {error && (
//             <p className="text-red-500 bg-red-100 border border-red-300 p-2 rounded mt-3">{error}</p>
//           )}

//           <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email Address"
//               value={form.email}
//               onChange={handleChange}
//               className="w-full border-b border-gray-400 focus:border-green-600 outline-none py-2"
//               required
//             />

//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={handleChange}
//                 className="w-full border-b border-gray-400 focus:border-green-600 outline-none py-2 pr-10"
//                 required
//               />
//               <div
//                 className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </div>
//             </div>

//             <div className="flex justify-end mt-2">
//               <Link to="/forgot" className="text-sm text-green-700 hover:underline">Forgot password?</Link>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
//               disabled={loading}
//             >
//               {loading ? "Logging In..." : "Log In"}
//             </button>

//             <div className="flex justify-center mt-4">
//               <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError("Google login failed")} />
//             </div>

//             <p className="text-sm text-gray-700 mt-4 text-center">
//               Don't have an account? <Link to="/register" className="text-green-700 font-semibold">Sign up</Link>
//             </p>
//           </form>
//         </div>

//         {/* Right Graphic */}
//         <div className="hidden md:flex  items-center justify-center" style={{width:"350px"}}>
//           <svg width="100%" height="100%" viewBox="0 0 592 1558" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
//             <path d="M566.607 0C580.415 0 591.607 11.1929 591.607 25V1538.78C591.607 1549.4 583.004 1558 572.391 1558H159.131C146.978 1558 136.586 1549.26 134.501 1537.29L0.37014 766.881C-0.134382 763.983 -0.123553 761.019 0.402121 758.125L134.378 20.5322C136.538 8.6429 146.892 0 158.976 0H566.607Z" fill="url(#paint0_linear)" />
//             <defs>
//               <linearGradient id="paint0_linear" x1="295.607" y1="0" x2="295.607" y2="1558" gradientUnits="userSpaceOnUse">
//                 <stop stopColor="#078405" stopOpacity="0.78"/>
//                 <stop offset="0.456731" stopColor="#BBD819"/>
//                 <stop offset="0.668269" stopColor="#82C42C" stopOpacity="0.84"/>
//                 <stop offset="1" stopColor="#078405" stopOpacity="0.98"/>
//               </linearGradient>
//             </defs>
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa"; // Icons added
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useAuth } from "../AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        // "https://vegpack-backend-1.onrender.com/api/auth/login",
        "https://vegpack-backend-1.onrender.com/api/auth/login",
        form,
        { withCredentials: true }
      );
      const { user: userData } = res.data;

      await login(userData);

      if (userData.role === "admin") navigate("/admin");
      else if (userData.role === "farmer") navigate("/farmer-dashboard");
      else navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwt_decode(credentialResponse.credential);
      const { email, name, sub: googleId } = decoded;

      const res = await axios.post(
        "http://localhost:5000/api/auth/google-login",
        { email, name, googleId },
        { withCredentials: true }
      );

      const { user: userData } = res.data;
      await login(userData);

      if (userData.role === "admin") navigate("/admin");
      else if (userData.role === "farmer") navigate("/farmer-dashboard");
      else navigate("/");
    } catch (err) {
      console.error("Google login error:", err);
      setError(err.response?.data?.message || "Google login failed");
    }
  };

  return (
    // --- Background Container with Image ---
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{
        // அழகான இயற்கை பின்னணி படம்
        backgroundImage: "url('src/assets/background.jpeg')",paddingTop:"100px",paddingBottom:"100px",objectFit:"cover"
      }}
    >
      {/* Dark Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" ></div>

      {/* --- GLASSMORMISM CARD --- */}
      <div 
        className="
          relative z-10 
          
          p-8 m-4
          rounded-2xl 
          shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] 
          backdrop-blur-[10px] 
          
        "
        style={{backgroundColor:"#dce1de",width:"550px",borderRadius:"15px"}}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-black drop-shadow-md">Welcome Back!</h2>
          <p className="text-black-200 text-sm mt-2">Login to access your VEGPack account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/80 text-black text-sm text-center border border-red-400">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* Email Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-black">
              <FaEnvelope />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="
                w-full pl-10 pr-4 py-3 
                bg-white/20 
                border border-white/30 
                rounded-lg 
                text-black
                placeholder-gray-300 
                focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white/30
                transition duration-200
              "
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray">
              <FaLock />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="
                w-full pl-10 pr-10 py-3 
                bg-white/20 
                border border-white/30 
                rounded-lg 
                text-black
                placeholder-gray-300 
                focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white/30
                transition duration-200
              "
              required
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-black hover:text-green-300 transition" style={{marginRight:"15px"}}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link to="/forgot" className="text-sm text-black-200 hover:text-black hover:underline transition">
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3 
              bg-gradient-to-r from-green-500 to-emerald-600 
              hover:from-green-600 hover:to-emerald-700
              text-black font-bold rounded-lg shadow-lg 
              transform hover:scale-[1.02] transition-all duration-200
              disabled:opacity-70 disabled:cursor-not-allowed
            "
          >
            {loading ? "Logging In..." : "Log In"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/30 flex-1"></div>
            <span className="text-black/70 text-sm">OR</span>
            <div className="h-px bg-white/30 flex-1"></div>
          </div>

          {/* Google Login */}
          <div className="flex justify-center">
            <div className="  p-1  hover:scale-105 ">
               <GoogleLogin 
                 onSuccess={handleGoogleSuccess} 
                 onError={() => setError("Google login failed")} 
                 shape="circle"
                 text="signin_with"
                 locale="en"
               />
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-black text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-green-300 font-bold hover:text-green-200 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import { useAuth } from "../AuthContext";
// import { motion } from "framer-motion"; // Animation
// import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2, Leaf } from "lucide-react"; // Modern Icons

// export default function Login() {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError("");
//   };

//   // --- Normal Login ---
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", form, { withCredentials: true });
//       const { user } = res.data;
//       await login(user);
//       if (user.role === "admin") navigate("/admin");
//       else if (user.role === "farmer") navigate("/farmer-dashboard");
//       else navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid credentials.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Google Login ---
//   const googleLogin = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       try {
//         const userInfo = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
//           headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
//         });
//         const res = await axios.post("http://localhost:5000/api/auth/google-login", {
//           email: userInfo.data.email,
//           name: userInfo.data.name,
//           googleId: userInfo.data.sub,
//         }, { withCredentials: true });
        
//         await login(res.data.user);
//         navigate("/");
//       } catch (err) {
//         setError("Google authentication failed.");
//       }
//     },
//     onError: () => setError("Google login failed"),
//   });

//   return (
//     <div className="min-h-screen w-full flex bg-white font-sans selection:bg-green-100 selection:text-green-900" style={{margin:"100px"}}>
      
//       {/* === LEFT SIDE: VISUAL & BRANDING (Hidden on Mobile) === */}
//       <div className="hidden lg:flex w-1/2 relative bg-black overflow-hidden">
//         {/* Background Image */}
//         <div 
//           className="absolute inset-0 opacity-60"
//           style={{
//             backgroundImage: "url('https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?q=80&w=1974&auto=format&fit=crop')",
//             backgroundSize: 'cover',
//             backgroundPosition: 'center'
//           }}
//         ></div>
        
//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-transparent to-transparent opacity-90"></div>

//         {/* Branding Content */}
//         <div className="relative z-10 w-full h-full flex flex-col justify-between p-16 text-white" style={{width:"200px"}}>
//           <div className="flex items-center gap-2">
//             <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
//               <Leaf className="text-green-400" size={24} />
//             </div>
//             <span className="text-xl font-bold tracking-wide">GreenGrocer</span>
//           </div>

//           <div className="space-y-6">
//             <h1 className="text-5xl font-bold leading-tight">
//               Fresh from Farm,<br /> 
//               Straight to <span className="text-green-400">Home.</span>
//             </h1>
//             <p className="text-lg text-gray-300 max-w-md">
//               Join thousands of farmers and customers in the most transparent agricultural marketplace.
//             </p>
            
           
//           </div>
          
//           <div className="text-xs text-gray-400">© 2025 GreenGrocer Inc.</div>
//         </div>
//       </div>

//       {/* === RIGHT SIDE: LOGIN FORM === */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50/50" style={{width:"650px"}}>
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="w-full max-w-[420px] bg-white p-10 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100"
//         >
//           {/* Header */}
//           <div className="mb-8">
//             <h2 className="text-3xl font-extrabold text-gray-900">Welcome back</h2>
//             <p className="text-gray-500 mt-2 text-sm">Please enter your details to sign in.</p>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2 border border-red-100">
//               <CheckCircle2 size={16} className="rotate-45" /> {error}
//             </motion.div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">
            
//             {/* Email */}
//             <div className="space-y-1.5">
//               <label className="text-sm font-semibold text-gray-700 ml-1">Email</label>
//               <div className="relative group">
//                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" size={20} />
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="name@example.com"
//                   value={form.email}
//                   onChange={handleChange}
//                   className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all font-medium"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div className="space-y-1.5">
//               <div className="flex justify-between items-center ml-1">
//                  <label className="text-sm font-semibold text-gray-700">Password</label>
//                  <Link to="/forgot" className="text-xs font-semibold text-green-600 hover:text-green-700">Forgot Password?</Link>
//               </div>
//               <div className="relative group">
//                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" size={20} />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   placeholder="••••••••"
//                   value={form.password}
//                   onChange={handleChange}
//                   className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all font-medium"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//             </div>

//             {/* Login Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3.5 bg-gray-900 hover:bg-black text-white font-bold rounded-xl shadow-lg shadow-gray-900/20 hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
//             >
//               {loading ? "Processing..." : <>Sign In <ArrowRight size={18} /></>}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="relative my-8">
//             <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
//             <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400 font-medium">Or continue with</span></div>
//           </div>

//           {/* Google Button */}
//           <button
//             onClick={() => googleLogin()}
//             className="w-full py-3.5 bg-white border border-gray-200 rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
//           >
//             <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
//             <span>Sign in with Google</span>
//           </button>

//           {/* Footer */}
//           <p className="mt-8 text-center text-sm text-gray-500">
//             Don't have an account?{" "}
//             <Link to="/register" className="font-bold text-green-600 hover:text-green-700 hover:underline">
//               Create free account
//             </Link>
//           </p>
//         </motion.div>
//       </div>

//     </div>
//   );
// }


// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import axios from "axios";
// import jwt_decode from "jwt-decode";
// import { GoogleLogin } from "@react-oauth/google";

// export default function Login() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [validationError, setValidationError] = useState({});

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setValidationError({ ...validationError, [e.target.name]: "" });
//     setError("");
//   };

//   const validate = () => {
//     const errors = {};
//     if (!form.email.trim()) errors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(form.email))
//       errors.email = "Please enter a valid email";
//     if (!form.password.trim()) errors.password = "Password is required";
//     return errors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errors = validate();
//     if (Object.keys(errors).length > 0) {
//       setValidationError(errors);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       const res = await axios.post("http://localhost:5000/api/auth/login", form);
//       const { token, user } = res.data;

//       if (!token) {
//         setError(res.data?.message || "Invalid credentials");
//         return;
//       }

//       localStorage.setItem("userToken", token);
//       localStorage.setItem("userName", user?.name);
//       localStorage.setItem("userRole", user?.role);

//       if (user.role === "admin") navigate("/admin/dashboard");
//       else if (user.role === "farmer") navigate("/farmer/dashboard");
//       else navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid email or password!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSuccess = async (credentialResponse) => {
//     try {
//       const decoded = jwt_decode(credentialResponse.credential);
//       const { email, name, sub: googleId } = decoded;

//       const res = await axios.post("http://localhost:5000/api/auth/google-login", {
//         email,
//         name,
//         googleId,
//       });

//       const { token, user } = res.data;

//       localStorage.setItem("userToken", token);
//       localStorage.setItem("userName", user?.name || name);
//       localStorage.setItem("userRole", user?.role || "customer");

//       if (user?.role === "admin") navigate("/admin/dashboard");
//       else if (user?.role === "farmer") navigate("/farmer/dashboard");
//       else navigate("/");
//     } catch (err) {
//       console.error("Google login error:", err);
//       setError("Google login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
//       <div className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
//         {/* Left Section: Form */}
//         <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
//           <h3 className="text-gray-600 text-sm uppercase">Welcome Back</h3>
//           <h2 className="text-3xl font-bold text-gray-800 mt-2 mb-6">
//             Log In
//           </h2>

//           {error && (
//             <p className="text-red-600 bg-red-100 border border-red-300 p-2 rounded mb-4">
//               {error}
//             </p>
//           )}

//           <form className="space-y-5" onSubmit={handleSubmit}>
//             {/* Email */}
//             <div>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email Address"
//                 value={form.email}
//                 onChange={handleChange}
//                 className={`w-full border-b-2 ${
//                   validationError.email ? "border-red-500" : "border-gray-300"
//                 } focus:border-green-600 outline-none py-2 px-2 rounded-md`}
//               />
//               {validationError.email && (
//                 <p className="text-red-500 text-sm mt-1">{validationError.email}</p>
//               )}
//             </div>

//             {/* Password */}
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={handleChange}
//                 className={`w-full border-b-2 ${
//                   validationError.password ? "border-red-500" : "border-gray-300"
//                 } focus:border-green-600 outline-none py-2 pl-2 pr-10 rounded-md`}
//               />
//               <div
//                 className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   <FaEyeSlash className="text-gray-500 hover:text-green-600" />
//                 ) : (
//                   <FaEye className="text-gray-500 hover:text-green-600" />
//                 )}
//               </div>

//               <div className="flex justify-end mt-2">
//                 <Link
//                   to="/forgot-password"
//                   className="text-sm text-green-700 hover:underline"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition"
//               disabled={loading}
//             >
//               {loading ? "Logging In..." : "Log In"}
//             </button>

//             {/* Google Login */}
//             <div className="flex justify-center mt-4">
//               <GoogleLogin
//                 onSuccess={handleGoogleSuccess}
//                 onError={() => setError("Google login failed")}
//               />
//             </div>

//             {/* Signup Link */}
//             <div className="text-center mt-5">
//               <p className="text-sm text-gray-700">
//                 Don't have an account?{" "}
//                 <Link to="/register" className="text-green-700 font-semibold">
//                   Sign up
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>

//         {/* Right Section: Illustration */}
//         <div className="hidden md:flex md:w-1/2 items-center justify-center bg-green-50">
//           {/* Optional: Add your SVG or image */}
//            <svg
//             width="100%"
//             height="100%"
//             viewBox="0 0 592 1558"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-full w-full"
//             style={{ width: "200px", height: "500px" }}
//           >
//             <path
//               d="M566.607 0..."
//               fill="url(#paint0_linear_36_89)"
//             />
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// }

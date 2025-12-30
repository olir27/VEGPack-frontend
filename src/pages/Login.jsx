

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
import bgImage from "../assets/background.jpeg";

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
        // "https://vegpack-backend-1.onrender.com/api/auth/login",
        "http://localhost:5000/api/auth/login",
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
    // <div 
    //   className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
    //   style={{
    //     // அழகான இயற்கை பின்னணி படம்
    //     backgroundImage: "url('src/assets/background.jpeg')",paddingTop:"100px",paddingBottom:"100px",objectFit:"cover"
    //   }}
    // >

    <div
  className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
  style={{
    backgroundImage: `url(${bgImage})`,
    paddingTop: "100px",
    paddingBottom: "100px",
    objectFit: "cover",
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

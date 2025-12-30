
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { GoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import jwt_decode from "jwt-decode";
// import { useAuth } from "../AuthContext";

// export default function Register() {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [agree, setAgree] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [serverError, setServerError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const passwordRegex =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//   const validateForm = () => {
//     let newErrors = {};
//     if (!form.name.trim()) newErrors.name = "Full name is required.";
//     if (!form.email) newErrors.email = "Email is required.";
//     else if (!/\S+@\S+\.\S+/.test(form.email))
//       newErrors.email = "Enter a valid email.";
//     if (!form.password) newErrors.password = "Password is required.";
//     else if (!passwordRegex.test(form.password))
//       newErrors.password =
//         "Password must be 8+ chars, uppercase, lowercase, number & symbol.";
//     if (!form.confirmPassword)
//       newErrors.confirmPassword = "Please confirm your password.";
//     else if (form.password !== form.confirmPassword)
//       newErrors.confirmPassword = "Passwords do not match.";
//     if (!agree) newErrors.agree = "You must agree with terms & conditions.";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//     setServerError("");
//   };


// const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (!validateForm()) return;

//   try {
//     setLoading(true);
//     setServerError("");

//     await axios.post(
//       // "https://vegpack-backend-1.onrender.com/api/auth/register",
//       "http://localhost:5000/api/auth/register",
//       {
//         name: form.name,
//         email: form.email,
//         password: form.password,
//         role: "customer",
//       },
//       { withCredentials: true } // cookie set
//     );

//     alert("Registration successful! Please login to continue.");
//     navigate("/login");
//   } catch (err) {
//     setServerError(
//       err.response?.data?.message || "Something went wrong!"
//     );
//   } finally {
//     setLoading(false);
//   }
// };

//   const handleGoogleSuccess = async (credentialResponse) => {
//   try {
//     const decoded = jwt_decode(credentialResponse.credential);
//     const { email, name, sub: googleId } = decoded;

//     const res = await axios.post(
//       "http://localhost:5000/api/auth/google-login",
//       { email, name, googleId },
//       { withCredentials: true }
//     );
//     const { user: userData } = res.data;

//     await login(userData);

//     if (userData.role === "admin") navigate("/admin");
//     else if (userData.role === "farmer") navigate("/farmer-dashboard");
//     else navigate("/");
//   } catch (err) {
//     console.error("Google login error:", err);
//     setServerError("Google login failed");
//   }
// };

//   const getPasswordStrength = () => {
//     if (!form.password) return "";
//     if (form.password.length < 6) return "Weak";
//     if (passwordRegex.test(form.password)) return "Strong";
//     return "Medium";
//   };
//   const strength = getPasswordStrength();

//   const conditions = [
//     { text: "At least 8 characters", valid: form.password.length >= 8 },
//     { text: "One uppercase letter", valid: /[A-Z]/.test(form.password) },
//     { text: "One lowercase letter", valid: /[a-z]/.test(form.password) },
//     { text: "One number", valid: /\d/.test(form.password) },
//     { text: "One special character (@$!%*?&)", valid: /[@$!%*?&]/.test(form.password) },
//   ];

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-green-200" style={{paddingTop:"100px",paddingBottom:"50px"}}>
//       <div className="rounded-3xl shadow-lg flex flex-col md:flex-row w-[90%] max-w-4xl overflow-hidden my-24" style={{ paddingLeft: "10px", background: "linear-gradient(135deg, #F6F4F4, #FBFAFA, #FFFFFF, #FFFFFF)" }}>
        
//         {/* Left Section */}
//         <div className="w-full md:w-1/2 p-8">
//           <h3 className="text-gray-600 text-sm uppercase">Welcome</h3>
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">Register as Customer</h2>

//           {serverError && <p className="text-red-500 bg-red-100 border border-red-300 p-2 rounded mt-3">{serverError}</p>}

//           <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
//             {/* Name */}
//             <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="w-full border-b border-gray-400 focus:border-green-600 outline-none py-2" />
//             {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}

//             {/* Email */}
//             <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} className="w-full border-b border-gray-400 focus:border-green-600 outline-none py-2" />
//             {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}

//             {/* Password */}
//             <div className="relative">
//               <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full border-b border-gray-400 focus:border-green-600 outline-none py-2 pl-2 pr-10 rounded" />
//               <div className="absolute inset-y-0 pr-2 flex items-center cursor-pointer right-2" onClick={() => setShowPassword(!showPassword)}>
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </div>
//               {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
//               {form.password && <p className={`text-xs mt-1 ${strength === "Weak" ? "text-red-500" : strength === "Medium" ? "text-yellow-500" : "text-green-600"}`}>Password Strength: {strength}</p>}
//               {form.password && <ul className="mt-2 text-xs space-y-1">{conditions.map((c,i)=>(
//                 <li key={i} className={`flex items-center ${c.valid ? "text-green-600" : "text-gray-500"}`}><span className="mr-2 font-bold">{c.valid ? "✔" : "✖"}</span>{c.text}</li>
//               ))}</ul>}
//             </div>

//             {/* Confirm Password */}
//             <div className="relative">
//               <input type={showConfirm ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} className="w-full border-b border-gray-400 focus:border-green-600 outline-none py-2 pl-2 pr-10 rounded" />
//               <div className="absolute inset-y-0 pr-2 flex items-center cursor-pointer right-2" onClick={() => setShowConfirm(!showConfirm)}>
//                 {showConfirm ? <FaEyeSlash /> : <FaEye />}
//               </div>
//               {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
//             </div>

//             {/* Terms */}
//             <div className="flex items-center space-x-2 mt-3">
//               <input type="checkbox" checked={agree} onChange={(e)=>setAgree(e.target.checked)} className="h-4 w-4 text-green-600" />
//               <span className="text-sm text-gray-600">Agree with terms & conditions</span>
//             </div>
//             {errors.agree && <p className="text-red-500 text-xs mt-1">{errors.agree}</p>}

//             {/* Submit */}
//             <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition" disabled={loading}>
//               {loading ? "Creating Account..." : "Create Account"}
//             </button>

//             {/* Google Login */}
//             <div className="flex justify-center mt-3">
//               <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setServerError("Google login failed")} />
//             </div>

//             {/* Links */}
//             <p className="text-center mt-4 text-sm text-gray-700">
//               Already have an account? <Link to="/login" className="text-green-700 font-semibold">Log In</Link>
//             </p>

//             <p className="text-center mt-2 text-sm text-gray-700">
//               Are you a farmer?{" "}
//               <span className="text-green-700 font-semibold cursor-pointer" onClick={()=>navigate("/register-farmer")}>
//                 Register here
//               </span>
//             </p>
//           </form>
//         </div>

//         {/* Right SVG */}
//         <div className="hidden md:flex md:w-1/2 items-center justify-center">
//           <svg width="100%" height="100%" viewBox="0 0 592 1558" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M566.607 0C580.415 0 591.607 11.1929 591.607 25V1538.78C591.607 1549.4 583.004 1558 572.391 1558H159.131C146.978 1558 136.586 1549.26 134.501 1537.29L0.37014 766.881C-0.134382 763.983 -0.123553 761.019 0.402121 758.125L134.378 20.5322C136.538 8.6429 146.892 0 158.976 0H566.607Z" fill="url(#paint0_linear)"/>
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


// src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useAuth } from "../AuthContext";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validateForm = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required.";
    if (!form.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Enter a valid email.";
    if (!form.password) newErrors.password = "Password is required.";
    else if (!passwordRegex.test(form.password))
      newErrors.password =
        "Password must be 8+ chars, uppercase, lowercase, number & symbol.";
    if (!form.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password.";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!agree)
      newErrors.agree = "You must agree with terms & conditions.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      setServerError("");

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: form.name,
          email: form.email,
          password: form.password,
          role: "customer",
        },
        { withCredentials: true }
      );

      alert("Registration successful! Please login to continue.");
      navigate("/login");
    } catch (err) {
      setServerError(
        err.response?.data?.message || "Something went wrong!"
      );
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
      else if (userData.role === "farmer")
        navigate("/farmer-dashboard");
      else navigate("/");
    } catch (err) {
      console.error("Google login error:", err);
      setServerError("Google login failed");
    }
  };

  const getPasswordStrength = () => {
    if (!form.password) return "";
    if (form.password.length < 6) return "Weak";
    if (passwordRegex.test(form.password)) return "Strong";
    return "Medium";
  };
  const strength = getPasswordStrength();

  const conditions = [
    {
      text: "At least 8 characters",
      valid: form.password.length >= 8,
    },
    {
      text: "One uppercase letter",
      valid: /[A-Z]/.test(form.password),
    },
    {
      text: "One lowercase letter",
      valid: /[a-z]/.test(form.password),
    },
    { text: "One number", valid: /\d/.test(form.password) },
    {
      text: "One special character (@$!%*?&)",
      valid: /[@$!%*?&]/.test(form.password),
    },
  ];

  return (
    <div className="register-page">
      <div className="register-card">
        {/* LEFT: Form */}
        <div className="register-left">
          <div className="register-heading-block">
            <p className="register-pill">Welcome</p>
            <h2 className="register-title">
              Create your <span>VegPack</span> account
            </h2>
            <p className="register-subtitle">
              Register as a customer to start ordering fresh vegetables
              and curated packs.
            </p>
          </div>

          {serverError && (
            <p className="register-server-error">
              {serverError}
            </p>
          )}

          <form
            className="register-form"
            onSubmit={handleSubmit}
          >
            {/* Name */}
            <div className="register-field">
              <label className="register-label">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder=""
                value={form.name}
                onChange={handleChange}
                className="register-input"
              />
              {errors.name && (
                <p className="register-error">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="register-field">
              <label className="register-label">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder=""
                value={form.email}
                onChange={handleChange}
                className="register-input"
              />
              {errors.email && (
                <p className="register-error">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="register-field">
              <label className="register-label">
                Password
              </label>
              <div className="register-password-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder=""
                  value={form.password}
                  onChange={handleChange}
                  className="register-input"
                />
                <button
                  type="button"
                  className="register-eye"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="register-error">
                  {errors.password}
                </p>
              )}

              {form.password && (
                <>
                  <p
                    className={`register-strength register-strength--${strength.toLowerCase()}`}
                  >
                    Password Strength: {strength}
                  </p>
                  <ul className="register-conditions">
                    {conditions.map((c, i) => (
                      <li
                        key={i}
                        className={`${
                          c.valid
                            ? "register-condition--valid"
                            : "register-condition--invalid"
                        }`}
                      >
                        <span className="register-condition-icon">
                          {c.valid ? "✔" : "✖"}
                        </span>
                        {c.text}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* Confirm Password */}
            <div className="register-field">
              <label className="register-label">
                Confirm Password
              </label>
              <div className="register-password-wrap">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder=""
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="register-input"
                />
                <button
                  type="button"
                  className="register-eye"
                  onClick={() =>
                    setShowConfirm(!showConfirm)
                  }
                >
                  {showConfirm ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="register-error">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="register-terms">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) =>
                  setAgree(e.target.checked)
                }
                className="register-terms__checkbox"
              />
              <span className="register-terms__text">
                I agree to the{" "}
                <span className="register-terms__link">
                  terms &amp; conditions
                </span>
              </span>
            </div>
            {errors.agree && (
              <p className="register-error">
                {errors.agree}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="register-submit"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

            {/* Divider */}
            <div className="register-divider">
              <span>or continue with</span>
            </div>

            {/* Google Login */}
            <div className="register-google">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() =>
                  setServerError("Google login failed")
                }
              />
            </div>

            {/* Links */}
            <p className="register-bottom-text">
              Already have an account?{" "}
              <Link
                to="/login"
                className="register-bottom-link"
              >
                Log In
              </Link>
            </p>

            <p className="register-bottom-text">
              Are you a farmer?{" "}
              <span
                className="register-bottom-link cursor-pointer"
                onClick={() =>
                  navigate("/register-farmer")
                }
              >
                Register as farmer
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
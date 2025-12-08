// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();
//   const API_BASE = "http://localhost:5000/api/auth";

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");

//     if (!email.trim()) return setError("Email is required");
//     if (!/\S+@\S+\.\S+/.test(email)) return setError("Enter a valid email");

//     try {
//       const res = await axios.post(`${API_BASE}/forgot-password`, { email });
//       setMessage(res.data.message);
//       navigate("/verify-otp", { state: { email } });
//     } catch (err) {
//       setError(err.response?.data?.message || "Error sending OTP");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
//       <div className="bg-white shadow-lg rounded-2xl w-full max-w-md px-8 py-10" style={{marginTop:"200px",marginBottom:"350px"}}>
        
//         <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
//           Forgot Password
//         </h1>

//         <p className="text-gray-600 text-center mb-6">
//           Enter your registered email to receive a password reset OTP.
//         </p>

//         <form onSubmit={handleSendOtp}>

//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="w-full p-3 border border-gray-300 rounded-lg mb-3 
//                        focus:outline-none focus:ring-2 focus:ring-green-600"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
//           {message && <p className="text-green-600 text-sm mb-2">{message}</p>}

//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white font-semibold py-3 
//                        rounded-lg hover:bg-green-700 transition"
//           >
//             Send OTP
//           </button>
//         </form>

//         <div className="text-center mt-6">
//           <button
//             onClick={() => navigate("/login")}
//             className="text-green-700 hover:underline"
//           >
//             Back to Login
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }




// src/pages/ForgotPassword.jsx
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSendOtp(e) {
    e.preventDefault();
    setErr("");
    setMsg("");
    if (!email) {
      setErr("Please enter your registered email");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/auth/forgot-password", { email });
      setMsg(res.message || "OTP sent to your email");
      // navigate to verify OTP page
      navigate("/verify-otp", { state: { email } });
    } catch (error) {
      console.error(error);
      setErr(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Forgot password</h2>
      <form onSubmit={handleSendOtp} className="space-y-4">
        <div>
          <label className="block text-sm">Enter your email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>

        {msg && <p className="text-green-600">{msg}</p>}
        {err && <p className="text-red-600">{err}</p>}

        <div>
          <button disabled={loading} type="submit" className="px-4 py-2 bg-green-700 text-white rounded">
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </div>
      </form>
    </div>
  );
}

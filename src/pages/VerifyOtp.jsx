// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";

// export default function VerifyOtp() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const email = state?.email; // email from forgot-password
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   const API_BASE = "http://localhost:5000/api/auth";

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${API_BASE}/verify-otp`, { email, otp });
//       setMessage(res.data.message);

//       // ✅ Pass both email and otp to Reset Password page
//       navigate("/reset-password", { state: { email, otp } });
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid OTP");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleVerifyOtp}
//         className="bg-white p-8 rounded-xl shadow-lg w-96"
//       >
//         <h2 className="text-2xl font-semibold text-center mb-6">Verify OTP</h2>

//         <input
//           type="text"
//           placeholder="Enter OTP"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           className="w-full p-3 border rounded mb-3"
//         />

//         <p className="text-sm text-gray-600 mb-3">OTP sent to {email}</p>

//         {error && <p className="text-red-600 mb-2">{error}</p>}
//         {message && <p className="text-green-600 mb-2">{message}</p>}

//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
//         >
//           Verify OTP
//         </button>
//       </form>
//     </div>
//   );
// }





// src/pages/VerifyOtp.jsx
import { useState,useEffect} from "react";
import api from "../api";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  useEffect(() => {
  if (!email) navigate("/forgot");   // direct URL / refresh handle
  }, [email, navigate]);

  const [otp, setOtp] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleVerify(e) {
    e.preventDefault();
    setErr("");
    if (!otp || otp.trim().length === 0) {
      setErr("Enter OTP");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/auth/verify-otp", { email, otp });
      // expected: success -> allow reset or return a temp token
      // if backend sends a resetToken, store it temporarily and navigate to reset
      // const resetToken = res.data.resetToken;
      navigate("/reset", { state: { email} });
    } catch (error) {
      console.error(error);
      setErr(error.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Verify OTP</h2>
      <p className="text-sm mb-4">We sent an OTP to <b>{email}</b></p>
      <form onSubmit={handleVerify} className="space-y-4">
        <div>
          <label className="block text-sm">OTP</label>
          <input value={otp} onChange={e => setOtp(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>

        {err && <p className="text-red-600">{err}</p>}

        <div>
          <button disabled={loading} type="submit" className="px-4 py-2 bg-green-700 text-white rounded">
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      </form>
    </div>
  );
}



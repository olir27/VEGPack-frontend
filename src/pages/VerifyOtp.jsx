
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



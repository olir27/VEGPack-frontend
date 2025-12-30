



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

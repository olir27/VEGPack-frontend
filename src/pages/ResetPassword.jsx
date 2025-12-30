
// src/pages/ResetPassword.jsx
import { useState,useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";

export default function ResetPassword() {
  const loc = useLocation();
  const navigate = useNavigate();

  const email = loc.state?.email || ""; // Email passed from "Forgot Password"
  useEffect(() => {
  if (!email) navigate("/forgot");
  }, [email, navigate]);
  
  const [otp, setOtp] = useState(""); 
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!otp.trim()) {
      setErr("OTP is required");
      return false;
    }
    if (!newPassword.trim()) {
      setErr("New password is required");
      return false;
    }
    if (newPassword.length < 8) {
      setErr("Password must be at least 8 characters");
      return false;
    }
    if (newPassword !== confirm) {
      setErr("Passwords do not match");
      return false;
    }
    setErr("");
    return true;
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const payload = { email, otp, newPassword };
      const res = await api.post("/auth/reset-password", payload);

     
      alert(res.message || "Password reset successful!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setErr(error.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="max-w-md w-full mx-4 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Reset Password</h2>
        <p className="text-sm mb-4 text-gray-600">
          Reset password for <b>{email}</b>
        </p>

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {err && <p className="text-red-600 text-sm">{err}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-green-700 text-white font-medium rounded hover:bg-green-800 transition"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            Remember your password?{" "}
            <span
              className="text-green-700 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

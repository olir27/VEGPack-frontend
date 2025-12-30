import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useAuth } from "../AuthContext";
import "./Register.css"; // reuse same CSS as customer Register

export default function RegisterFarmer() {
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

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: form.name,
          email: form.email,
          password: form.password,
          role: "farmer", // farmer role
        },
        { withCredentials: true }
      );

      const { user: userData } = res.data;
      await login(userData);
      navigate("/farmer-dashboard");
    } catch (err) {
      console.error("Farmer register error:", err);
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

  const strength =
    !form.password
      ? ""
      : form.password.length < 6
      ? "Weak"
      : passwordRegex.test(form.password)
      ? "Strong"
      : "Medium";

  const conditions = [
    { text: "At least 8 characters", valid: form.password.length >= 8 },
    { text: "One uppercase letter", valid: /[A-Z]/.test(form.password) },
    { text: "One lowercase letter", valid: /[a-z]/.test(form.password) },
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
              Register as <span>Farmer</span>
            </h2>
            <p className="register-subtitle">
              Join VegPack to list your fresh produce and reach more
              customers.
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
                placeholder="John Farmer"
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
                placeholder="you@example.com"
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
                  placeholder="Create a strong password"
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
                  placeholder="Re-enter password"
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
              Not a farmer?{" "}
              <span
                className="register-bottom-link cursor-pointer"
                onClick={() =>
                  navigate("/register")
                }
              >
                Register as Customer
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
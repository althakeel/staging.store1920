import React, { useState } from "react";
import axios from "axios";
import "../../assets/styles/SignInModal.css";
import { useAuth } from "../../contexts/AuthContext";
import FacebookIcon from "../../assets/images/facebook.png";
import GoogleSignInButton from '../../components/sub/GoogleSignInButton';

// ===================== Alert Component =====================
const Alert = ({ children, onClose }) => (
  <div className="signin-error-alert">
    <div className="signin-error-content">{children}</div>
    <button onClick={onClose} className="signin-error-close" aria-label="Close alert">
      ×
    </button>
  </div>
);

// ===================== Parse WordPress Error =====================
const parseErrorMsg = (rawMsg) => {
  if (!rawMsg) return null;
  const linkMatch = rawMsg.match(/<a [^>]*>([^<]+)<\/a>/);
  if (linkMatch) {
    const linkText = linkMatch[1];
    const textOnly = rawMsg.replace(/<a[^>]*>[^<]*<\/a>/, "").replace(/<[^>]+>/g, "").trim();
    return (
      <>
        <strong>Error:</strong> {textOnly}{" "}
        <a
          href="https://store1920.com/lost-password"
          target="_blank"
          rel="noopener noreferrer"
          className="signin-lost-password-link"
        >
          {linkText}
        </a>
      </>
    );
  }
  return <>{rawMsg.replace(/<[^>]+>/g, "").trim()}</>;
};

// ===================== Main Component =====================
const SignInModal = ({ isOpen, onClose, onLogin }) => {
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const FRONTEND_URL = "https://store1920.com";
  const WP_API = "https://db.store1920.com/wp-json";

  // ===================== Handlers =====================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleForgotPassword = () => {
    onClose();
    window.location.href = `${FRONTEND_URL}/lost-password`;
  };

  // ===================== Validation =====================
  const validateRegister = () => {
    if (!formData.name.trim()) return setErrorMsg("Name is required"), false;
    if (!formData.email.trim()) return setErrorMsg("Email is required"), false;
    if (!formData.phone.trim()) return setErrorMsg("Phone number is required"), false;
    if (!formData.password) return setErrorMsg("Password is required"), false;
    if (formData.password !== formData.confirmPassword)
      return setErrorMsg("Passwords do not match"), false;
    setErrorMsg(null);
    return true;
  };

  const validateLogin = () => {
    if (!formData.email.trim()) return setErrorMsg("Email is required"), false;
    if (!formData.password) return setErrorMsg("Password is required"), false;
    setErrorMsg(null);
    return true;
  };

  // ===================== API Calls =====================
  const registerUser = async () => {
    if (!validateRegister()) return;
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await axios.post(`${WP_API}/custom/v1/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });

      const loginRes = await axios.post(`${WP_API}/jwt-auth/v1/token`, {
        username: formData.email,
        password: formData.password,
      });

      if (loginRes.data?.token) {
        const userInfo = {
          name: formData.name,
          image: "",
          token: loginRes.data.token,
          id: res.data.id || res.data.user_id,
          email: formData.email,
          user: res.data,
        };
        login(userInfo);
        localStorage.setItem("userId", userInfo.id);
        localStorage.setItem("email", userInfo.email);
        localStorage.setItem("token", userInfo.token);
        onLogin?.(userInfo);
        onClose();
      } else {
        setErrorMsg("Login failed after registration");
      }
    } catch (err) {
      setErrorMsg(parseErrorMsg(err.response?.data?.message || "Registration failed"));
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async () => {
    if (!validateLogin()) return;
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await axios.post(`${WP_API}/jwt-auth/v1/token`, {
        username: formData.email,
        password: formData.password,
      });

      if (res.data?.token) {
        const profileRes = await axios.get(`${WP_API}/wp/v2/users/me`, {
          headers: { Authorization: `Bearer ${res.data.token}` },
        });

        const userInfo = {
          name: profileRes.data.name || formData.email,
          image: "",
          token: res.data.token,
          id: profileRes.data.id,
          email: formData.email,
          user: profileRes.data,
        };

        login(userInfo);
        localStorage.setItem("userId", userInfo.id);
        localStorage.setItem("email", userInfo.email);
        localStorage.setItem("token", userInfo.token);
        onLogin?.(userInfo);
        onClose();
      } else {
        setErrorMsg("Invalid login credentials");
      }
    } catch (err) {
      setErrorMsg(parseErrorMsg(err.response?.data?.message || "Login failed"));
    } finally {
      setLoading(false);
    }
  };

  // ===================== Social Login (WordPress Nextend) =====================
  const handleSocialLogin = (provider) => {
    const baseUrl = "https://db.store1920.com/wp-login.php?loginSocial=";
    window.location.href = `${baseUrl}${provider}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isRegister ? registerUser() : loginUser();
  };

  if (!isOpen) return null;

  // ===================== Render =====================
  return (
    <>
      <div className="signin-modal-overlay" onClick={onClose} />
      <div className="signin-modal-container" role="dialog" aria-modal="true">
        <button className="signin-modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="signin-modal-header">
          <h2 className="signin-modal-title">Sign in / Register</h2>
          <div className="signin-security">🔒 All data will be encrypted</div>

          <div className="signin-benefits">
            <div className="benefit-item">
              🚚 Free shipping <span className="benefit-subtext">Special for you</span>
            </div>
            <div className="benefit-item">
              ↩ Free returns <span className="benefit-subtext">Up to 90 days</span>
            </div>
          </div>
        </div>

        <form className="signin-modal-form" onSubmit={handleSubmit} noValidate>
          {errorMsg && <Alert onClose={() => setErrorMsg(null)}>{errorMsg}</Alert>}

          <input
            type="text"
            name="email"
            placeholder="Email or phone number"
            value={formData.email}
            onChange={handleChange}
            className="signin-modal-input"
            required
          />

          {!isRegister && (
            <>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="signin-modal-input"
                required
              />
              <div className="signin-show-password">
                <label>
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  Show password
                </label>
              </div>
            </>
          )}

          {isRegister && (
            <>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="signin-modal-input"
                required
              />
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="signin-modal-input"
                required
              />
              <div className="signin-show-password">
                <label>
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  Show password
                </label>
              </div>
            </>
          )}

          <button type="submit" className="signin-submit-btn" disabled={loading}>
            {loading ? "Please wait..." : isRegister ? "Register" : "Continue"}
          </button>
        </form>

        {!isRegister && (
          <div className="signin-forgot-password-text" onClick={handleForgotPassword}>
            Trouble signing in?
          </div>
        )}

        <div className="signin-divider">
          <span>Or continue with</span>
        </div>

        <div className="signin-social-icons">
          <GoogleSignInButton onLogin={onLogin} />

          <button onClick={() => handleSocialLogin("facebook")}>
            <img src={FacebookIcon} alt="Facebook" />
          </button>
          <button disabled>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
              alt="Apple"
              width="30px"
              height="50px"
            />
          </button>
        </div>

        <div className="signin-terms">
          By continuing, you agree to our{" "}
          <a href="/terms-0f-use">Terms</a> and <a href="/privacy-policy">Privacy Policy</a>.
        </div>

        <div className="signin-toggle-text">
          {isRegister ? (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="signin-toggle-link"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="signin-toggle-link"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SignInModal;

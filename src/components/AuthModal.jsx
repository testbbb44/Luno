import { useApiPost } from "@/hooks/useApi";
import { AlertCircle, CheckCircle, Eye, EyeOff, Loader2, Wallet, X } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

  // Reusable password input with eye toggle
  const PasswordInput = ({ id, name, value, onChange, placeholder, show, onToggle, disabled }) => (
    <div className="relative">
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        className="w-full px-3 py-2 pr-10 bg-slate-50 border border-slate-200 rounded-md text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        autoComplete={id === "loginPassword" ? "current-password" : "new-password"}
        required
        disabled={disabled}
      />
      <button
        type="button"
        onClick={onToggle}
        disabled={disabled}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-600 transition-colors disabled:opacity-50"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );


const AuthModal = ({ type, onClose }) => {
  const { post } = useApiPost();

  const [activeTab, setActiveTab] = useState(type || "login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const dialogRef = useRef(null);
  useEffect(() => {
    if (!type) return;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const frame = requestAnimationFrame(() => dialogRef.current?.querySelector('input')?.focus());
    const onKey = event => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab') return;
      const items = [...(dialogRef.current?.querySelectorAll('button:not([disabled]), input:not([disabled]), a[href]') || [])];
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { cancelAnimationFrame(frame); document.body.style.overflow = overflow; document.removeEventListener('keydown', onKey); previous?.focus?.(); };
  }, [type, onClose]);

  // Password visibility states
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form states
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  // Update activeTab when type prop changes
  useEffect(() => {
    if (type) {
      setActiveTab(type);
    }
  }, [type]);

  if (!type) return null;

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignupInputChange = (e) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
    } = signupForm;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    let formattedPhone = phoneNumber.replace(/\D/g, "");
    if (!formattedPhone.startsWith("1") && formattedPhone.length === 10) {
      formattedPhone = "+1" + formattedPhone;
    } else if (!formattedPhone.startsWith("+")) {
      formattedPhone = "+" + formattedPhone;
    }

    try {
      const response = await post("auth/signup", {
        firstName,
        lastName,
        email,
        phoneNumber: formattedPhone,
        password,
        confirmPassword,
      });

      if (response.success === false) {
        setError(response.message);
      } else if (response.success === true) {
        setSuccess("Account created successfully! Please login to continue.");

        setSignupForm({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
        });

        setTimeout(() => {
          setActiveTab("login");
          setError("");
          setSuccess("");
        }, 1500);
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!loginForm.email || !loginForm.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await post(
        "auth/login",
        {
          ...(loginForm.email.includes("@") ? { email: loginForm.email.trim() } : { username: loginForm.email.trim() }),
          password: loginForm.password,
        },
        true
      );

      if (response.success !== true) {
        if (response.type === "INVALID_CREDENTIALS") {
          setError("Invalid email or password. Please check your credentials.");
        } else {
          setError(response.message || "Login failed. Please try again.");
        }
      } else if (response.success) {
        setSuccess("Login successful! Redirecting to dashboard...");
        localStorage.setItem("userData", JSON.stringify(response.data));
        setLoginForm({ email: "", password: "" });

        setTimeout(() => {
          setActiveTab(null);
          navigate("/dashboard");
        }, 1500);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "login") {
      handleLogin(e);
    } else {
      handleSignup(e);
    }
  };


  return (
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="LunoVest account" className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="lv-auth-modal relative w-full max-w-md mx-4 bg-white border border-blue-200 backdrop-blur-sm rounded-lg shadow-xl">
        <button type="button" aria-label="Close account dialog" onClick={onClose} className="absolute right-4 top-4 text-slate-500 hover:text-slate-900"><X size={18} /></button>
        {/* Header */}
        <div className="p-6 pb-4">
          <h2 className="text-slate-900 text-center text-2xl flex items-center justify-center gap-2">
            <Wallet className="h-6 w-6 text-blue-700" />
            Welcome to LunoVest
          </h2>
        </div>

        <div className="px-6 pb-6">
          {/* Tab Navigation */}
          <div className="grid grid-cols-2 bg-slate-50 rounded-lg p-1 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab("login")}
              className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "login"
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("signup")}
              className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "signup"
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">{success}</span>
            </div>
          )}

          {/* Login Form */}
          {activeTab === "login" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="loginEmail"
                  className="block text-sm font-medium text-slate-600"
                >
                  Email or username
                </label>
                <input
                  id="loginEmail"
                  name="email"
                  value={loginForm.email}
                  onChange={handleLoginInputChange}
                  type="text"
                  autoComplete="username"
                  placeholder="Enter your email or username"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="loginPassword"
                  className="block text-sm font-medium text-slate-600"
                >
                  Password
                </label>
                <PasswordInput
                  id="loginPassword"
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginInputChange}
                  placeholder="Enter your password"
                  show={showLoginPassword}
                  onToggle={() => setShowLoginPassword((v) => !v)}
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login to Dashboard"
                )}
              </button>
              <p className="text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="text-blue-700 hover:text-blue-700 transition-colors"
                  onClick={() => setActiveTab("signup")}
                  disabled={loading}
                >
                  Sign up here
                </button>
              </p>
            </form>
          )}

          {/* Signup Form */}
          {activeTab === "signup" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-slate-600"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    value={signupForm.firstName}
                    onChange={handleSignupInputChange}
                    placeholder="John"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-slate-600"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    value={signupForm.lastName}
                    onChange={handleSignupInputChange}
                    placeholder="Doe"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="signupEmail"
                  className="block text-sm font-medium text-slate-600"
                >
                  Email
                </label>
                <input
                  id="signupEmail"
                  name="email"
                  value={signupForm.email}
                  onChange={handleSignupInputChange}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-slate-600"
                >
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={signupForm.phoneNumber}
                  onChange={handleSignupInputChange}
                  type="tel"
                  placeholder="+1234567890"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="signupPassword"
                  className="block text-sm font-medium text-slate-600"
                >
                  Password
                </label>
                <PasswordInput
                  id="signupPassword"
                  name="password"
                  value={signupForm.password}
                  onChange={handleSignupInputChange}
                  placeholder="Create a strong password"
                  show={showSignupPassword}
                  onToggle={() => setShowSignupPassword((v) => !v)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-slate-600"
                >
                  Confirm Password
                </label>
                <PasswordInput
                  id="confirmPassword"
                  name="confirmPassword"
                  value={signupForm.confirmPassword}
                  onChange={handleSignupInputChange}
                  placeholder="Confirm your password"
                  show={showConfirmPassword}
                  onToggle={() => setShowConfirmPassword((v) => !v)}
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account & Start Investing"
                )}
              </button>
              <p className="text-center text-sm text-slate-500">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-blue-700 hover:text-blue-700 transition-colors"
                  onClick={() => setActiveTab("login")}
                  disabled={loading}
                >
                  Login here
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
import { useState } from "react";
import "./Login.css";

export default function Login({ onSwitch }) {
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState({});

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleBlur = (e) => {
        setTouched((prev) => ({ ...prev, [e.target.name]: true }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login Attempt:", form);
        alert("Check console for login data. Role will be fetched from backend later.");
    };

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

    return (
        <div className="login-root">
            {/* Background blobs */}
            <div className="blob blob-1" />
            <div className="blob blob-2" />
            <div className="blob blob-3" />

            <div className="login-card">
                {/* Logo / Brand */}
                <div className="login-brand">
                    <div className="brand-icon">
                        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="40" height="40" rx="12" fill="url(#brandGrad)" />
                            <path
                                d="M20 8L32 15V25L20 32L8 25V15L20 8Z"
                                fill="white"
                                fillOpacity="0.9"
                            />
                            <path d="M20 8L20 32" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" />
                            <path d="M8 15L32 25" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" />
                            <path d="M32 15L8 25" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" />
                            <defs>
                                <linearGradient id="brandGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="var(--purple)" />
                                    <stop offset="1" stopColor="var(--teal)" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <h1 className="brand-name">Schoolify</h1>
                    <p className="brand-tagline">Welcome Back! Please login to your account.</p>
                </div>

                {/* Divider */}
                <div className="login-divider" />

                {/* Form */}
                <form className="login-form" onSubmit={handleSubmit} noValidate>
                    {/* Email */}
                    <div className={`field-group ${touched.email && !isEmailValid ? "field-error" : ""}`}>
                        <label htmlFor="email" className="field-label">
                            Email Address
                        </label>
                        <div className="field-input-wrap">
                            <span className="field-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="4" width="20" height="16" rx="3" />
                                    <path d="M2 7l10 7 10-7" />
                                </svg>
                            </span>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="field-input"
                                required
                            />
                        </div>
                        {touched.email && !isEmailValid && (
                            <span className="field-error-msg">Valid email required.</span>
                        )}
                    </div>

                    {/* Password */}
                    <div className={`field-group ${touched.password && form.password.length < 6 ? "field-error" : ""}`}>
                        <label htmlFor="password" className="field-label">
                            Password
                        </label>
                        <div className="field-input-wrap">
                            <span className="field-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </span>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={form.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="field-input"
                                required
                            />
                            <button
                                type="button"
                                className="field-toggle"
                                onClick={() => setShowPassword((v) => !v)}
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {touched.password && form.password.length < 6 && (
                            <span className="field-error-msg">Password too short.</span>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        id="login-submit-btn"
                        type="submit"
                        className="login-btn"
                        disabled={!isEmailValid || form.password.length < 6}
                    >
                        <span>Sign In</span>
                        <span className="login-btn-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </span>
                    </button>
                </form>

                <div className="auth-switch">
                    Don't have an account? <button onClick={onSwitch}>Create account</button>
                </div>

                <p className="login-footer">
                    &copy; {new Date().getFullYear()} Schoolify.
                </p>
            </div>
        </div>
    );
}

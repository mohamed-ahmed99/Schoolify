import { useState } from "react";
import "./Login.css";

const ROLES = [
    { value: "owner", label: "Platform Owner" },
    { value: "admin", label: "School Admin" },
    { value: "teacher", label: "Teacher" },
    { value: "student", label: "Student" },
];

export default function Register({ onSwitch }) {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        role: "",
        password: "",
        confirmPassword: "",
        extraInfo: "", // Field for School Name / Org Name etc.
    });
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
        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log("Registration Data:", form);
        alert(`Registered as ${form.role}! Check console for details.`);
    };

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    const passwordsMatch = form.password === form.confirmPassword;

    // Dynamic Label for Extra Info based on Role
    const getExtraInfoLabel = () => {
        switch (form.role) {
            case "student":
            case "teacher":
                return "School Name";
            case "admin":
                return "School Access Code";
            case "owner":
                return "Organization / Company Name";
            default:
                return "";
        }
    };

    const extraLabel = getExtraInfoLabel();

    return (
        <div className="login-root">
            <div className="blob blob-1" />
            <div className="blob blob-2" />
            <div className="blob blob-3" />

            <div className="login-card">
                <div className="login-brand">
                    <div className="brand-icon">
                        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="40" height="40" rx="12" fill="url(#brandGrad)" />
                            <path d="M20 8L32 15V25L20 32L8 25V15L20 8Z" fill="white" fillOpacity="0.9" />
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
                    <p className="brand-tagline">Create your professional account.</p>
                </div>

                <div className="login-divider" />

                <form className="login-form" onSubmit={handleSubmit} noValidate>
                    {/* Full Name */}
                    <div className={`field-group ${touched.fullName && form.fullName.length < 3 ? "field-error" : ""}`}>
                        <label htmlFor="fullName" className="field-label">Full Name</label>
                        <div className="field-input-wrap">
                            <span className="field-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </span>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                placeholder="e.g. Ahmed Ali"
                                value={form.fullName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="field-input"
                                required
                            />
                        </div>
                    </div>

                    {/* Role Selection */}
                    <div className={`field-group ${touched.role && !form.role ? "field-error" : ""}`}>
                        <label htmlFor="role" className="field-label">Register As</label>
                        <div className="field-input-wrap">
                            <span className="field-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </span>
                            <select
                                id="role"
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`field-input field-select ${!form.role ? "placeholder-active" : ""}`}
                                required
                            >
                                <option value="" disabled>Select your role</option>
                                {ROLES.map((r) => (
                                    <option key={r.value} value={r.value}>{r.label}</option>
                                ))}
                            </select>
                            <span className="select-arrow">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </span>
                        </div>
                    </div>

                    {/* Conditional Extra Info Field */}
                    {extraLabel && (
                        <div className={`field-group ${touched.extraInfo && !form.extraInfo ? "field-error" : ""}`}>
                            <label htmlFor="extraInfo" className="field-label">{extraLabel}</label>
                            <div className="field-input-wrap">
                                <span className="field-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                        <polyline points="9 22 9 12 15 12 15 22" />
                                    </svg>
                                </span>
                                <input
                                    id="extraInfo"
                                    name="extraInfo"
                                    type="text"
                                    placeholder={`Enter your ${extraLabel.toLowerCase()}`}
                                    value={form.extraInfo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="field-input"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* Email */}
                    <div className={`field-group ${touched.email && !isEmailValid ? "field-error" : ""}`}>
                        <label htmlFor="email" className="field-label">Email Address</label>
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
                        {touched.email && !isEmailValid && <span className="field-error-msg">Valid email required.</span>}
                    </div>

                    {/* Password Row (Optional split visual if needed, but keeping simple for now) */}
                    <div className="field-group">
                        <label htmlFor="password" className="field-label">Password</label>
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
                            >
                                {showPassword ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className={`field-group ${touched.confirmPassword && !passwordsMatch ? "field-error" : ""}`}>
                        <label htmlFor="confirmPassword" className="field-label">Confirm Password</label>
                        <div className="field-input-wrap">
                            <span className="field-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                            </span>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="field-input"
                                required
                            />
                        </div>
                        {touched.confirmPassword && !passwordsMatch && <span className="field-error-msg">Passwords don't match.</span>}
                    </div>

                    <button
                        type="submit"
                        className="login-btn"
                        disabled={
                            !isEmailValid ||
                            form.password.length < 6 ||
                            !passwordsMatch ||
                            form.fullName.length < 3 ||
                            !form.role ||
                            (extraLabel && !form.extraInfo)
                        }
                    >
                        <span>Create Account</span>
                        <span className="login-btn-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </span>
                    </button>
                </form>

                <div className="auth-switch">
                    Already have an account? <button onClick={onSwitch}>Sign In</button>
                </div>

                <p className="login-footer">&copy; {new Date().getFullYear()} Schoolify.</p>
            </div>
        </div>
    );
}

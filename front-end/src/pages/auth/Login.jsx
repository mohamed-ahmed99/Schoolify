import { useState } from "react";
import { motion } from "framer-motion";
import schoolifyLogo from "../../assets/schoolify_logo_transparent (1).png";
import "./Login.css";
import LogoLoader from "../../components/Loader/Loader";

const staggerContainer = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

export default function Login({ onSwitch }) {
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleBlur = (e) => {
        setTouched((prev) => ({ ...prev, [e.target.name]: true }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("Login Attempt:", form);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            alert("Check console for login data. Role will be fetched from backend later.");
        }, 1500);
    };

    if (loading) return <LogoLoader />;

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

    return (
        <div className="login-root">
            {/* Background blobs with floating animation */}
            <motion.div
                className="blob blob-1"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="blob blob-2"
                animate={{ scale: [1, 1.2, 1], rotate: [0, -120, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="blob blob-3"
                animate={{ scale: [1, 1.15, 1], y: [0, 50, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
                className="login-card"
            >
                <div className="login-brand">
                    <div className="brand-icon">
                        <div className="brand-icon-inner">
                            <img src={schoolifyLogo} alt="Schoolify Logo" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                        </div>
                    </div>
                    <h1 className="brand-name">Schoolify</h1>
                    <p className="brand-tagline">The future of school management.</p>
                </div>

                <div className="login-divider" />

                <motion.form
                    className="login-form"
                    onSubmit={handleSubmit}
                    noValidate
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    <motion.div className={`field-group ${touched.email && !isEmailValid ? "field-error" : ""}`} variants={fadeInUp}>
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
                        {touched.email && !isEmailValid && (
                            <span className="field-error-msg">Valid email required.</span>
                        )}
                    </motion.div>

                    <motion.div className={`field-group ${touched.password && form.password.length < 6 ? "field-error" : ""}`} variants={fadeInUp}>
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
                    </motion.div>

                    <motion.button
                        id="login-submit-btn"
                        type="submit"
                        className="login-btn"
                        disabled={!isEmailValid || form.password.length < 6}
                        variants={fadeInUp}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span>Sign In</span>
                        <span className="login-btn-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </span>
                    </motion.button>
                </motion.form>

                <motion.div className="auth-switch" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                    Don't have an account? <button onClick={onSwitch}>Create account</button>
                </motion.div>

                <p className="login-footer">
                    &copy; {new Date().getFullYear()} Schoolify.
                </p>
            </motion.div>
        </div>
    );
}

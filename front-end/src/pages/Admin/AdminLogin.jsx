import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import "./AdminLogin.css";

const API_BASE_URL = "http://localhost:5150/api";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { handleLogin } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/sign-in`, {
                email,
                password,
                accountType: "user" // System Admin is a user in the schema
            });

            if (response.data.status === "success") {
                const userData = response.data.data;

                // Verify if the user is actually an admin
                if (userData.role !== 'system_admin') {
                    toast.error("Access denied: You are not a System Administrator.");
                    setLoading(false);
                    return;
                }

                handleLogin(userData, userData.token);
                toast.success("Welcome back, Administrator!");
                navigate('/admin/verify-schools');
            }
        } catch (error) {
            console.error('Admin Login failed:', error);
            toast.error(error.response?.data?.message || "Invalid credentials. Access denied.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-root">
            <motion.div
                className="admin-login-card"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className="admin-login-header">
                    <div className="admin-shield-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6-8 10-8 10z" />
                        </svg>
                    </div>
                    <h1>System Administration</h1>
                    <p>Restricted Access Gateway</p>
                </div>

                <form className="admin-login-form" onSubmit={handleSubmit}>
                    <div className="admin-field">
                        <label>Admin Email</label>
                        <input
                            type="email"
                            required
                            placeholder="Root access email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="admin-field">
                        <label>Password</label>
                        <input
                            type="password"
                            required
                            placeholder="••••••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="admin-login-btn"
                        disabled={loading || !email || !password}
                    >
                        {loading ? "Authenticating..." : "Authorize Access"}
                    </button>

                    <div className="admin-footer">
                        <p>Unauthorized access is strictly prohibited and monitored.</p>
                        <button type="button" onClick={() => navigate('/')} className="back-to-site">
                            Return to public site
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

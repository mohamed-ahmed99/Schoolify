import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa';
import schoolifyLogo from '../assets/schoolify_logo_transparent (1).png';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = ({ onNavigate }) => {
    const { theme, toggleTheme } = useTheme();
    const { user, handleLogout } = useAuth();

    return (
        <motion.nav
            className="navbar"
            initial={{ y: -70 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
            <div className="navbar-container">
                {/* Logo */}
                <motion.div
                    className="navbar-logo"
                    onClick={() => onNavigate('home')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <img src={schoolifyLogo} alt="Schoolify Logo" className="navbar-logo-img" />
                    <span>Schoolify</span>
                </motion.div>

                {/* Nav links */}
                <div className="navbar-links">
                    <motion.button className="nav-link" onClick={() => onNavigate('home')} whileHover={{ y: -2 }}>Home</motion.button>
                    <motion.button className="nav-link" onClick={() => onNavigate('schools')} whileHover={{ y: -2 }}>Schools</motion.button>
                    <div className="nav-dropdown">
                        <button className="nav-link">Profiles</button>
                        <div className="dropdown-content">
                            <button className="dropdown-item" onClick={() => onNavigate('profile-owner')}>Owner Profile</button>
                            <button className="dropdown-item" onClick={() => onNavigate('profile-admin')}>Admin Profile</button>
                            <button className="dropdown-item" onClick={() => onNavigate('profile-teacher')}>Teacher Profile</button>
                            <button className="dropdown-item" onClick={() => onNavigate('profile-student')}>Student Profile</button>
                        </div>
                    </div>
                    {user && user.role === 'system_admin' && (
                        <motion.button className="nav-link" onClick={() => onNavigate('admin-dashboard')} whileHover={{ y: -2 }}>Admin Dashboard</motion.button>
                    )}
                    {!user && (
                        <motion.button className="nav-link" onClick={() => onNavigate('login')} whileHover={{ y: -2 }}>Login</motion.button>
                    )}
                </div>

                {/* Actions */}
                <div className="navbar-actions">
                    {!user ? (
                        <motion.button
                            className="btn-join"
                            onClick={() => onNavigate('register-school')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get Started
                        </motion.button>
                    ) : (
                        <motion.button
                            className="nav-logout"
                            onClick={() => {
                                handleLogout();
                                onNavigate('home');
                            }}
                        >
                            <FaSignOutAlt />
                            Logout
                        </motion.button>
                    )}
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label="Toggle Theme"
                        title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.span
                                key={theme}
                                initial={{ y: -20, opacity: 0, rotate: -90 }}
                                animate={{ y: 0, opacity: 1, rotate: 0 }}
                                exit={{ y: 20, opacity: 0, rotate: 90 }}
                                transition={{ duration: 0.2 }}
                                style={{ display: 'inline-block' }}
                            >
                                {theme === 'light' ? <FaMoon /> : <FaSun />}
                            </motion.span>
                        </AnimatePresence>
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;

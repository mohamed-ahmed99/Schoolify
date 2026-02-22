import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import schoolifyLogo from '../assets/schoolify_logo_transparent (1).png';
import './Navbar.css';

const Navbar = ({ onNavigate }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo */}
                <div className="navbar-logo" onClick={() => onNavigate('home')}>
                    <img src={schoolifyLogo} alt="Schoolify Logo" className="navbar-logo-img" />
                    <span>Schoolify</span>
                </div>

                {/* Nav links */}
                <div className="navbar-links">
                    <button className="nav-link" onClick={() => onNavigate('home')}>Home</button>
                    <button className="nav-link" onClick={() => onNavigate('schools')}>Schools</button>
                    <button className="nav-link" onClick={() => onNavigate('login')}>Portal</button>
                </div>

                {/* Actions */}
                <div className="navbar-actions">
                    <button className="btn-join" onClick={() => onNavigate('register')}>
                        Get Started
                    </button>
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label="Toggle Theme"
                        title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                    >
                        {theme === 'light' ? <FaMoon /> : <FaSun />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

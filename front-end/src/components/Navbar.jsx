import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon, FaGraduationCap } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <FaGraduationCap className="logo-icon" />
                    <span>Schoolify</span>
                </div>
                <div className="navbar-actions">
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

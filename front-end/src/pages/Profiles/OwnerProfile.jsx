import React from 'react';
import { motion } from 'framer-motion';
import {
    FaUser, FaEnvelope, FaShieldAlt, FaCalendarAlt,
    FaCog, FaBell, FaSignOutAlt, FaSchool, FaUsers
} from 'react-icons/fa';
import './Profiles.css';

const fup = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
};

export default function OwnerProfile() {
    const userData = {
        name: "School Owner",
        email: "owner@schoolify.edu",
        joinDate: "January 2024",
        role: "Proprietor"
    };

    return (
        <div className="up-page">
            <div className="up-container">
                <motion.div
                    className="up-header owner-theme"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="up-header-content">
                        <div className="up-avatar-big"><FaShieldAlt /></div>
                        <div className="up-info-text">
                            <h1 className="up-name">{userData.name}</h1>
                            <p className="up-role-badge"><FaShieldAlt /> {userData.role}</p>
                        </div>
                    </div>
                </motion.div>

                <div className="up-grid">
                    <motion.div className="up-sidebar" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="up-side-card">
                            <h3 className="up-side-title">Owner Controls</h3>
                            <div className="up-side-links">
                                <button className="up-side-link active"><FaUser /> My Profile</button>
                                <button className="up-side-link"><FaSchool /> Registered Schools</button>
                                <button className="up-side-link"><FaUsers /> Team Management</button>
                                <button className="up-side-link"><FaCog /> System Settings</button>
                                <hr className="up-divider" />
                                <button className="up-side-link logout"><FaSignOutAlt /> Sign Out</button>
                            </div>
                        </div>
                    </motion.div>

                    <div className="up-main">
                        <motion.div className="up-section" variants={fup} initial="initial" animate="animate">
                            <h2 className="up-sec-title">Account Details</h2>
                            <div className="up-info-grid">
                                <div className="up-info-item">
                                    <FaEnvelope className="up-info-icon" />
                                    <div><label>Email Address</label><p>{userData.email}</p></div>
                                </div>
                                <div className="up-info-item">
                                    <FaCalendarAlt className="up-info-icon" />
                                    <div><label>Member Since</label><p>{userData.joinDate}</p></div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div className="up-section" variants={fup} initial="initial" animate="animate" transition={{ delay: 0.2 }}>
                            <h2 className="up-sec-title">Portfolio Overview</h2>
                            <div className="up-dash-grid">
                                <motion.div className="up-dash-card" whileHover={{ y: -5 }}>
                                    <FaSchool />
                                    <div><h3>5 Schools</h3><p>Active and fully managed.</p></div>
                                </motion.div>
                                <motion.div className="up-dash-card" whileHover={{ y: -5 }}>
                                    <FaUsers />
                                    <div><h3>250+ Staff</h3><p>Teachers and administrators.</p></div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

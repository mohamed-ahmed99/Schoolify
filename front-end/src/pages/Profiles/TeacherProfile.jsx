import React from 'react';
import { motion } from 'framer-motion';
import {
    FaUser, FaEnvelope, FaChalkboardTeacher, FaCalendarAlt,
    FaCog, FaBook, FaSignOutAlt, FaTasks, FaGraduationCap
} from 'react-icons/fa';
import './Profiles.css';

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
};

export default function TeacherProfile() {
    const userData = {
        name: "Prof. Sarah Miller",
        email: "sarah.m@schoolify.edu",
        joinDate: "August 2024",
        role: "Senior Teacher"
    };

    return (
        <div className="up-page">
            <div className="up-container">
                <motion.div
                    className="up-header teacher-theme"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="up-header-content">
                        <div className="up-avatar-big"><FaChalkboardTeacher /></div>
                        <div className="up-info-text">
                            <h1 className="up-name">{userData.name}</h1>
                            <p className="up-role-badge"><FaChalkboardTeacher /> {userData.role}</p>
                        </div>
                    </div>
                </motion.div>

                <div className="up-grid">
                    <motion.div className="up-sidebar" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="up-side-card">
                            <h3 className="up-side-title">Teacher Area</h3>
                            <div className="up-side-links">
                                <button className="up-side-link active"><FaUser /> My Profile</button>
                                <button className="up-side-link"><FaBook /> My Courses</button>
                                <button className="up-side-link"><FaTasks /> Assignments</button>
                                <button className="up-side-link"><FaGraduationCap /> Gradebook</button>
                                <hr className="up-divider" />
                                <button className="up-side-link logout"><FaSignOutAlt /> Sign Out</button>
                            </div>
                        </div>
                    </motion.div>

                    <div className="up-main">
                        <motion.div className="up-section" variants={fadeUp} initial="initial" animate="animate">
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

                        <motion.div className="up-section" variants={fadeUp} initial="initial" animate="animate" transition={{ delay: 0.2 }}>
                            <h2 className="up-sec-title">Academic Overview</h2>
                            <div className="up-dash-grid">
                                <motion.div className="up-dash-card" whileHover={{ y: -5 }}>
                                    <FaBook />
                                    <div><h3>4 Classes</h3><p>Currently teaching this semester.</p></div>
                                </motion.div>
                                <motion.div className="up-dash-card" whileHover={{ y: -5 }}>
                                    <FaTasks />
                                    <div><h3>28 Tasks</h3><p>Student submissions to grade.</p></div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React from 'react';
import { motion } from 'framer-motion';
import {
    FaUserGraduate, FaChalkboardTeacher, FaMapMarkerAlt,
    FaPhone, FaEnvelope, FaGlobe, FaChevronLeft,
    FaAward, FaBook, FaCalendarAlt, FaShieldAlt
} from 'react-icons/fa';
import schoolifyLogo from '../../assets/schoolify_logo_transparent (1).png';
import './SchoolProfile.css';

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

export default function SchoolProfile({ school, onBack }) {
    // If no school is provided (shouldn't happen with proper logic), show a fallback
    if (!school) return null;

    const { identity, contact, stats, administration } = school;

    return (
        <div className="sp-page">
            {/* ── Top Navigation / Back button ── */}
            <motion.div
                className="sp-nav-bar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="sp-container">
                    <button className="sp-back-btn" onClick={onBack}>
                        <FaChevronLeft /> Back to Directory
                    </button>
                </div>
            </motion.div>

            <div className="sp-container">
                {/* ── Header Section ── */}
                <motion.header
                    className="sp-header"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="sp-cover-gradient"></div>
                    <div className="sp-header-content">
                        <div className="sp-logo-container">
                            <img src={schoolifyLogo} alt="School Logo" className="sp-main-logo" />
                        </div>
                        <div className="sp-identity">
                            <div className="sp-title-row">
                                <h1 className="sp-school-name">{identity.name}</h1>
                                <span className="sp-tag">{administration?.educationalStage || 'General'}</span>
                            </div>
                            <p className="sp-location">
                                <FaMapMarkerAlt /> {contact?.address?.city || 'Unknown City'}, {contact?.address?.country || 'Unknown Country'}
                            </p>
                        </div>
                        <div className="sp-header-actions">

                            <button className="sp-btn-outline">Contact Admin</button>
                        </div>
                    </div>
                </motion.header>

                {/* ── Main Content Grid ── */}
                <div className="sp-main-grid">
                    {/* Left Column: About & Details */}
                    <motion.div
                        className="sp-content-col"
                        initial="initial"
                        animate="animate"
                        variants={{ animate: { transition: { staggerChildren: 0.2 } } }}
                    >
                        <motion.section className="sp-section" variants={fadeUp}>
                            <h2 className="sp-sec-title">About the Institution</h2>
                            <p className="sp-full-desc">
                                {identity.description || "Detailed description for this institution is currently being updated. Schoolify ensures that all registered schools maintain a high standard of educational excellence and community involvement."}
                            </p>
                        </motion.section>

                        <motion.section className="sp-section" variants={fadeUp}>
                            <h2 className="sp-sec-title">Our Programs</h2>
                            <div className="sp-programs-grid">
                                <motion.div className="sp-prog-card" whileHover={{ scale: 1.02 }}>
                                    <FaBook className="sp-prog-icon" />
                                    <div>
                                        <h3>Curriculum Focus</h3>
                                        <p>Comprehensive {administration?.educationalStage || 'K-12'} curriculum designed for academic rigour.</p>
                                    </div>
                                </motion.div>
                                <motion.div className="sp-prog-card" whileHover={{ scale: 1.02 }}>
                                    <FaAward className="sp-prog-icon" />
                                    <div>
                                        <h3>Quality Assurance</h3>
                                        <p>State-verified and certified by Schoolify's quality control board.</p>
                                    </div>
                                </motion.div>
                                <motion.div className="sp-prog-card" whileHover={{ scale: 1.02 }}>
                                    <FaShieldAlt className="sp-prog-icon" />
                                    <div>
                                        <h3>Secure Environment</h3>
                                        <p>Modernized campus facilities with advanced safety and health protocols.</p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.section>
                    </motion.div>

                    {/* Right Column: Stats & Contact */}
                    <motion.div
                        className="sp-side-col"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="sp-sidebar-card sp-stats-card">
                            <h3 className="sp-side-title">Live Stats</h3>
                            <div className="sp-side-stat">
                                <FaUserGraduate />
                                <div>
                                    <strong>{stats?.totalStudents || 0}</strong>
                                    <span>Total Students</span>
                                </div>
                            </div>
                            <div className="sp-side-stat">
                                <FaChalkboardTeacher />
                                <div>
                                    <strong>{stats?.totalTeachers || 0}</strong>
                                    <span>Expert Teachers</span>
                                </div>
                            </div>
                            <div className="sp-side-stat">
                                <FaCalendarAlt />
                                <div>
                                    <strong>Active</strong>
                                    <span>Current Status</span>
                                </div>
                            </div>
                        </div>

                        <div className="sp-sidebar-card sp-contact-card">
                            <h3 className="sp-side-title">Contact Information</h3>
                            <div className="sp-contact-link">
                                <FaEnvelope /> <span>{contact.email}</span>
                            </div>
                            {contact.phone && (
                                <div className="sp-contact-link">
                                    <FaPhone /> <span>{contact.phone}</span>
                                </div>
                            )}
                            {contact.website && (
                                <div className="sp-contact-link">
                                    <FaGlobe /> <span>{contact.website}</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

import React from 'react';
import {
    FaUserGraduate, FaChalkboardTeacher, FaMapMarkerAlt,
    FaPhone, FaEnvelope, FaGlobe, FaChevronLeft,
    FaAward, FaBook, FaCalendarAlt, FaShieldAlt
} from 'react-icons/fa';
import schoolifyLogo from '../../assets/schoolify_logo_transparent (1).png';
import './SchoolProfile.css';

export default function SchoolProfile({ school, onBack }) {
    // If no school is provided (shouldn't happen with proper logic), show a fallback
    if (!school) return null;

    const { identity, contact, stats, administration } = school;

    return (
        <div className="sp-page">
            {/* ── Top Navigation / Back button ── */}
            <div className="sp-nav-bar">
                <div className="sp-container">
                    <button className="sp-back-btn" onClick={onBack}>
                        <FaChevronLeft /> Back to Directory
                    </button>
                </div>
            </div>

            <div className="sp-container">
                {/* ── Header Section ── */}
                <header className="sp-header">
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
                </header>

                {/* ── Main Content Grid ── */}
                <div className="sp-main-grid">
                    {/* Left Column: About & Details */}
                    <div className="sp-content-col">
                        <section className="sp-section">
                            <h2 className="sp-sec-title">About the Institution</h2>
                            <p className="sp-full-desc">
                                {identity.description || "Detailed description for this institution is currently being updated. Schoolify ensures that all registered schools maintain a high standard of educational excellence and community involvement."}
                            </p>
                        </section>

                        <section className="sp-section">
                            <h2 className="sp-sec-title">Our Programs</h2>
                            <div className="sp-programs-grid">
                                <div className="sp-prog-card">
                                    <FaBook className="sp-prog-icon" />
                                    <div>
                                        <h3>Curriculum Focus</h3>
                                        <p>Comprehensive {administration?.educationalStage || 'K-12'} curriculum designed for academic rigour.</p>
                                    </div>
                                </div>
                                <div className="sp-prog-card">
                                    <FaAward className="sp-prog-icon" />
                                    <div>
                                        <h3>Quality Assurance</h3>
                                        <p>State-verified and certified by Schoolify's quality control board.</p>
                                    </div>
                                </div>
                                <div className="sp-prog-card">
                                    <FaShieldAlt className="sp-prog-icon" />
                                    <div>
                                        <h3>Secure Environment</h3>
                                        <p>Modernized campus facilities with advanced safety and health protocols.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Stats & Contact */}
                    <div className="sp-side-col">
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
                    </div>
                </div>
            </div>
        </div>
    );
}

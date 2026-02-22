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
                                <h1 className="sp-school-name">{school.name}</h1>
                                <span className="sp-tag">{school.type}</span>
                            </div>
                            <p className="sp-location">
                                <FaMapMarkerAlt /> {school.location}
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
                            <p className="sp-full-desc">{school.description}</p>
                        </section>

                        <section className="sp-section">
                            <h2 className="sp-sec-title">Our Programs</h2>
                            <div className="sp-programs-grid">
                                <div className="sp-prog-card">
                                    <FaBook className="sp-prog-icon" />
                                    <div>
                                        <h3>Advanced Curriculum</h3>
                                        <p>Standardized international curriculum focused on critical thinking.</p>
                                    </div>
                                </div>
                                <div className="sp-prog-card">
                                    <FaAward className="sp-prog-icon" />
                                    <div>
                                        <h3>Excellence Awards</h3>
                                        <p>Recognized for outstanding academic performance since 2018.</p>
                                    </div>
                                </div>
                                <div className="sp-prog-card">
                                    <FaShieldAlt className="sp-prog-icon" />
                                    <div>
                                        <h3>Safety First</h3>
                                        <p>Secure campus with modern surveillance and health protocols.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Stats & Contact */}
                    <div className="sp-side-col">
                        <div className="sp-sidebar-card sp-stats-card">
                            <h3 className="sp-side-title">Quick Stats</h3>
                            <div className="sp-side-stat">
                                <FaUserGraduate />
                                <div>
                                    <strong>{school.students}</strong>
                                    <span>Total Students</span>
                                </div>
                            </div>
                            <div className="sp-side-stat">
                                <FaChalkboardTeacher />
                                <div>
                                    <strong>{school.teachers}</strong>
                                    <span>Expert Teachers</span>
                                </div>
                            </div>
                            <div className="sp-side-stat">
                                <FaCalendarAlt />
                                <div>
                                    <strong>Sept 15</strong>
                                    <span>Next Semester</span>
                                </div>
                            </div>
                        </div>

                        <div className="sp-sidebar-card sp-contact-card">
                            <h3 className="sp-side-title">Contact Information</h3>
                            <div className="sp-contact-link">
                                <FaPhone /> <span>+20 123 456 7890</span>
                            </div>
                            <div className="sp-contact-link">
                                <FaEnvelope /> <span>info@{school.name.toLowerCase().replace(/\s/g, '')}.edu</span>
                            </div>
                            <div className="sp-contact-link">
                                <FaGlobe /> <span>www.{school.name.toLowerCase().replace(/\s/g, '')}.edu</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

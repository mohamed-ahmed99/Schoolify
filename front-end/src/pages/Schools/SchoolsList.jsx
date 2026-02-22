import React, { useState, useEffect } from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import schoolifyLogo from '../../assets/schoolify_logo_transparent (1).png';
import './SchoolsList.css';

export default function SchoolsList({ onViewProfile }) {
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5150/api/schools/get?limit=20&page=1');
                const result = await response.json();

                if (result.status === "success") {
                    setSchools(result.data.schools);
                } else {
                    setError(result.message || "Failed to fetch schools");
                }
            } catch (err) {
                setError("Could not connect to the server. Please ensure the backend is running.");
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSchools();
    }, []);

    if (loading) {
        return (
            <div className="sl-page">
                <div className="sl-container">
                    <div className="sl-loading">
                        <div className="sl-spinner"></div>
                        <p>Loading schools...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="sl-page">
                <div className="sl-container">
                    <div className="sl-error">
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()} className="sl-view-btn">Try Again</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="sl-page">
            <div className="sl-container">
                <header className="sl-header">
                    <p className="sl-overline">Directory</p>
                    <h1 className="sl-h1">Registered <span className="sl-accent">Schools</span></h1>
                    <p className="sl-sub">Explore the diverse network of institutions that trust Schoolify to power their educational journey.</p>
                </header>

                <div className="sl-grid">
                    {schools.length > 0 ? (
                        schools.map(school => (
                            <div key={school._id} className="sl-card">
                                <div className="sl-card-banner"></div>
                                <div className="sl-card-body">
                                    <div className="sl-logo-wrap">
                                        <img
                                            src={schoolifyLogo}
                                            alt="School Logo"
                                            className="sl-school-logo"
                                        />
                                    </div>
                                    <div className="sl-card-info-main">
                                        <h2 className="sl-school-name">{school.identity.name}</h2>
                                        <p className="sl-school-location">
                                            <FaMapMarkerAlt /> {school.contact?.address?.city || 'Unknown City'}, {school.contact?.address?.country || 'Unknown Country'}
                                        </p>
                                        <p className="sl-school-desc">
                                            {school.identity.description || "No description available for this institution."}
                                        </p>
                                    </div>

                                    <div className="sl-stats">
                                        <div className="sl-stat">
                                            <span className="sl-stat-icon"><FaUserGraduate /></span>
                                            <div className="sl-stat-info">
                                                <span className="sl-stat-val">{school.stats?.totalStudents || 0}</span>
                                                <span className="sl-stat-label">Students</span>
                                            </div>
                                        </div>
                                        <div className="sl-stat">
                                            <span className="sl-stat-icon"><FaChalkboardTeacher /></span>
                                            <div className="sl-stat-info">
                                                <span className="sl-stat-val">{school.stats?.totalTeachers || 0}</span>
                                                <span className="sl-stat-label">Teachers</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sl-actions">
                                        <button
                                            className="sl-view-btn"
                                            onClick={() => onViewProfile(school)}
                                        >
                                            View Profile <FaArrowRight />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="sl-empty">
                            <p>No schools found in the directory.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

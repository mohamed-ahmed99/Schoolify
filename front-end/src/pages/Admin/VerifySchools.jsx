import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { FaCheckCircle, FaSchool, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import './VerifySchools.css';

const API_BASE_URL = 'http://localhost:5150/api';

export default function VerifySchools() {
    const { token, user } = useAuth();
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token && user?.role === 'system_admin') {
            fetchSchools();
        } else if (user) {
            setLoading(false);
        }
    }, [token, user]);

    const fetchSchools = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/admin/not-verified-schools`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.status === 'success') {
                setSchools(response.data.data.schools);
            }
        } catch (error) {
            console.error('Failed to fetch pending schools:', error);
            toast.error(error.response?.data?.message || 'Failed to load schools');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifySchool = async (id) => {
        const confirmApproval = window.confirm("Are you sure you want to approve this school?");
        if (!confirmApproval) return;

        try {
            const response = await axios.patch(`${API_BASE_URL}/admin/verify-school/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.status === 'success') {
                toast.success('School has been approved and activated!');
                setSchools(schools.filter(school => school._id !== id));
            }
        } catch (error) {
            console.error('Failed to verify school:', error);
            toast.error(error.response?.data?.message || 'Failed to verify school');
        }
    };

    if (loading) {
        return (
            <div className="vs-loading">
                <div className="vs-spinner"></div>
                <h2>Loading Pending Schools...</h2>
            </div>
        );
    }

    if (!user || user.role !== 'system_admin') {
        return (
            <div className="vs-error">
                <h2>Access Denied</h2>
                <p>You do not have permission to view this page. Only System Administrators can approve schools.</p>
            </div>
        );
    }

    return (
        <div className="vs-page">
            <div className="vs-container">
                <div className="vs-header">
                    <span className="vs-overline">SYSTEM ADMINISTRATION</span>
                    <h1 className="vs-title">Pending Schools Approval</h1>
                    <p className="vs-subtitle">Review and activate schools that have verified their email but await your approval.</p>
                </div>

                {schools.length === 0 ? (
                    <div className="vs-empty">
                        <FaCheckCircle className="vs-empty-icon" />
                        <h2>All Caught Up!</h2>
                        <p>There are no pending schools waiting for approval at the moment.</p>
                    </div>
                ) : (
                    <div className="vs-grid">
                        {schools.map((school, index) => (
                            <motion.div
                                className="vs-card"
                                key={school._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <div className="vs-card-header">
                                    <div className="vs-card-logo">
                                        <FaSchool />
                                    </div>
                                    <div className="vs-card-identity">
                                        <h3>{school.name}</h3>
                                        <span className="vs-tag">{school.systemType} - {school.educationLevel}</span>
                                    </div>
                                </div>
                                <div className="vs-card-body">
                                    <p className="vs-desc">{school.overview}</p>

                                    <div className="vs-info-list">
                                        <div className="vs-info-item">
                                            <FaMapMarkerAlt />
                                            <span>{school.contact?.address?.city || 'No City'}, {school.contact?.address?.country || 'No Country'}</span>
                                        </div>
                                        <div className="vs-info-item">
                                            <FaEnvelope />
                                            <span>{school.contact?.email}</span>
                                        </div>
                                        <div className="vs-info-item">
                                            <FaPhone />
                                            <span>{school.contact?.phone}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="vs-card-footer">
                                    <button
                                        className="vs-approve-btn"
                                        onClick={() => handleVerifySchool(school._id)}
                                    >
                                        Approve & Activate
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

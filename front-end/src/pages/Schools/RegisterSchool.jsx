import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
    FaSchool, FaInfoCircle, FaEnvelope, FaPhone,
    FaGlobe, FaMapMarkerAlt, FaGlobeAmericas, FaCity,
    FaRoad, FaGraduationCap, FaPaperPlane, FaUser, FaLock, FaChevronRight, FaChevronLeft,
    FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaPlus, FaTrash
} from 'react-icons/fa';
import './RegisterSchool.css';

import LogoLoader from '../../components/Loader/Loader';

const API_BASE_URL = 'http://localhost:5150/api';

const SOCIAL_PLATFORMS = [
    { name: 'Facebook', icon: <FaFacebook /> },
    { name: 'Instagram', icon: <FaInstagram /> },
    { name: 'Twitter', icon: <FaTwitter /> },
    { name: 'LinkedIn', icon: <FaLinkedin /> },
];

export default function RegisterSchool() {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    if (isLoading) return <LogoLoader />;

    const [formData, setFormData] = useState({
        school: {
            identity: {
                name: '',
                description: '',
                code: '',
            },
            contact: {
                email: '',
                phone: '',
                website: '',
                socialLinks: [],
                address: {
                    country: '',
                    governorate: '',
                    city: '',
                    street: ''
                }
            },
            administration: {
                educationalStage: 'primary',
            },
            stats: {
                totalStudents: 0,
                totalTeachers: 0,
                totalAdmins: 0,
                totalClasses: 0
            }
        },
        owner: {
            personalInfo: {
                firstName: '',
                lastName: '',
                bio: '',
            },
            contact: {
                email: '',
                phoneNumber: '',
            },
            account: {
                password: '',
            },
            headTeacherInfo: {
                yearsOfExperience: 0,
            }
        }
    });

    const handleChange = (category, section, field, value) => {
        setFormData(prev => {
            const updated = { ...prev };
            if (field.includes('.')) {
                const [subSection, subField] = field.split('.');
                updated[category][section][subSection][subField] = value;
            } else if (section) {
                updated[category][section][field] = value;
            } else {
                updated[category][field] = value;
            }
            return updated;
        });
    };

    const addSocialLink = () => {
        setFormData(prev => ({
            ...prev,
            school: {
                ...prev.school,
                contact: {
                    ...prev.school.contact,
                    socialLinks: [...prev.school.contact.socialLinks, { platform: 'Facebook', url: '' }]
                }
            }
        }));
    };

    const removeSocialLink = (index) => {
        setFormData(prev => ({
            ...prev,
            school: {
                ...prev.school,
                contact: {
                    ...prev.school.contact,
                    socialLinks: prev.school.contact.socialLinks.filter((_, i) => i !== index)
                }
            }
        }));
    };

    const updateSocialLink = (index, field, value) => {
        setFormData(prev => {
            const updatedLinks = [...prev.school.contact.socialLinks];
            updatedLinks[index][field] = value;
            return {
                ...prev,
                school: {
                    ...prev.school,
                    contact: {
                        ...prev.school.contact,
                        socialLinks: updatedLinks
                    }
                }
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Prepare data for backend format
        const payload = {
            user: {
                user: {
                    personalInfo: formData.owner.personalInfo,
                    contact: formData.owner.contact,
                    account: formData.owner.account,
                },
                headTeacher: {
                    info: formData.owner.headTeacherInfo
                }
            },
            school: formData.school
        };

        try {
            const response = await axios.post(`${API_BASE_URL}/schools/create`, payload);
            if (response.data.status === 'success') {
                alert('Success! Your school and owner account have been created.');
                // Maybe redirect to login or dashboard
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert(error.response?.data?.message || 'Standard registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    return (
        <div className="reg-school-root">
            <motion.div
                className="reg-school-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="reg-school-header">
                    <h1>School Registration</h1>
                    <p>{step === 1 ? 'Step 1: Institutional Details' : 'Step 2: Owner Account Setup'}</p>
                    <div className="step-indicator">
                        <span className={step === 1 ? 'active' : ''}>1</span>
                        <div className="step-line"></div>
                        <span className={step === 2 ? 'active' : ''}>2</span>
                    </div>
                </div>

                <form className="reg-school-form" onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="step-container"
                            >
                                {/* Identity Section */}
                                <div className="form-section"><FaSchool /> School Identity</div>
                                <div className="form-grid">
                                    <div className="field-group">
                                        <label className="field-label">School Name</label>
                                        <div className="field-input-wrap">
                                            <span className="field-icon"><FaSchool /></span>
                                            <input type="text" className="field-input" placeholder="e.g. Bright Future Academy"
                                                value={formData.school.identity.name} onChange={(e) => handleChange('school', 'identity', 'name', e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className="field-group">
                                        <label className="field-label">School Code</label>
                                        <div className="field-input-wrap">
                                            <span className="field-icon"><FaInfoCircle /></span>
                                            <input type="text" className="field-input" placeholder="e.g. BFA-2024"
                                                value={formData.school.identity.code} onChange={(e) => handleChange('school', 'identity', 'code', e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className="field-group full-width">
                                        <label className="field-label">Description</label>
                                        <div className="field-input-wrap">
                                            <span className="field-icon"><FaInfoCircle /></span>
                                            <textarea className="field-input" placeholder="Describe your school's mission..."
                                                value={formData.school.identity.description} onChange={(e) => handleChange('school', 'identity', 'description', e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Section */}
                                <div className="form-section"><FaEnvelope /> School Contact</div>
                                <div className="form-grid">
                                    <div className="field-group">
                                        <label className="field-label">Official Email</label>
                                        <div className="field-input-wrap">
                                            <span className="field-icon"><FaEnvelope /></span>
                                            <input type="email" className="field-input" placeholder="contact@school.edu"
                                                value={formData.school.contact.email} onChange={(e) => handleChange('school', 'contact', 'email', e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className="field-group">
                                        <label className="field-label">Phone</label>
                                        <div className="field-input-wrap">
                                            <span className="field-icon"><FaPhone /></span>
                                            <input type="tel" className="field-input" placeholder="+20..."
                                                value={formData.school.contact.phone} onChange={(e) => handleChange('school', 'contact', 'phone', e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                {/* Social Links Section */}
                                <div className="form-section">
                                    <span><FaGlobe /> Social Media Links</span>
                                    <button type="button" className="add-social-btn" onClick={addSocialLink}>
                                        <FaPlus /> Add Link
                                    </button>
                                </div>
                                <div className="social-links-container">
                                    {formData.school.contact.socialLinks.map((link, index) => (
                                        <div key={index} className="social-link-row">
                                            <select
                                                className="field-input social-platform-select"
                                                value={link.platform}
                                                onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                                            >
                                                {SOCIAL_PLATFORMS.map(p => (
                                                    <option key={p.name} value={p.name}>{p.name}</option>
                                                ))}
                                            </select>
                                            <input
                                                type="url"
                                                className="field-input"
                                                placeholder="https://..."
                                                value={link.url}
                                                onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                                            />
                                            <button type="button" className="remove-social-btn" onClick={() => removeSocialLink(index)}>
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ))}
                                    {formData.school.contact.socialLinks.length === 0 && (
                                        <p className="no-social-hint">No social links added yet. Click "+ Add Link" to add one.</p>
                                    )}
                                </div>

                                {/* Statistics Section */}
                                <div className="form-section"><FaInfoCircle /> Current Statistics</div>
                                <div className="form-grid">
                                    <div className="field-group">
                                        <label className="field-label">Current Students</label>
                                        <div className="field-input-wrap">
                                            <span className="field-icon"><FaUser /></span>
                                            <input type="number" className="field-input" placeholder="0" min="0"
                                                value={formData.school.stats.totalStudents} onChange={(e) => handleChange('school', 'stats', 'totalStudents', parseInt(e.target.value) || 0)} />
                                        </div>
                                    </div>
                                    <div className="field-group">
                                        <label className="field-label">Total Staff/Teachers</label>
                                        <div className="field-input-wrap">
                                            <span className="field-icon"><FaUser /></span>
                                            <input type="number" className="field-input" placeholder="0" min="0"
                                                value={formData.school.stats.totalTeachers} onChange={(e) => handleChange('school', 'stats', 'totalTeachers', parseInt(e.target.value) || 0)} />
                                        </div>
                                    </div>
                                    <div className="field-group">
                                        <label className="field-label">Total Classes</label>
                                        <div className="field-input-wrap">
                                            <span className="field-icon"><FaSchool /></span>
                                            <input type="number" className="field-input" placeholder="0" min="0"
                                                value={formData.school.stats.totalClasses} onChange={(e) => handleChange('school', 'stats', 'totalClasses', parseInt(e.target.value) || 0)} />
                                        </div>
                                    </div>
                                    <div className="field-group">
                                        <label className="field-label">Total Admins/Staff</label>
                                        <div className="field-input-wrap">
                                            <span className="field-icon"><FaUser /></span>
                                            <input type="number" className="field-input" placeholder="0" min="0"
                                                value={formData.school.stats.totalAdmins} onChange={(e) => handleChange('school', 'stats', 'totalAdmins', parseInt(e.target.value) || 0)} />
                                        </div>
                                    </div>
                                </div>

                                {/* Address Section */}
                                <div className="form-section"><FaMapMarkerAlt /> Location</div>
                                <div className="form-grid">
                                    <div className="field-group">
                                        <input type="text" className="field-input adr-input" placeholder="Country"
                                            value={formData.school.contact.address.country} onChange={(e) => handleChange('school', 'contact', 'address.country', e.target.value)} />
                                    </div>
                                    <div className="field-group">
                                        <input type="text" className="field-input adr-input" placeholder="City"
                                            value={formData.school.contact.address.city} onChange={(e) => handleChange('school', 'contact', 'address.city', e.target.value)} />
                                    </div>
                                </div>

                                <div className="reg-school-footer">
                                    <button type="button" className="reg-btn" onClick={nextStep}>
                                        <span>Next: Owner Details</span> <FaChevronRight />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="step-container"
                            >
                                <div className="form-section"><FaUser /> Owner Information</div>
                                <div className="form-grid">
                                    <div className="field-group">
                                        <label className="field-label">First Name</label>
                                        <div className="field-input-wrap">
                                            <span className="field-icon"><FaUser /></span>
                                            <input type="text" className="field-input" placeholder="Ahmed"
                                                value={formData.owner.personalInfo.firstName} onChange={(e) => handleChange('owner', 'personalInfo', 'firstName', e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className="field-group">
                                        <label className="field-label">Last Name</label>
                                        <div className="field-input-wrap">
                                            <span className="field-icon"><FaUser /></span>
                                            <input type="text" className="field-input" placeholder="Ali"
                                                value={formData.owner.personalInfo.lastName} onChange={(e) => handleChange('owner', 'personalInfo', 'lastName', e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className="field-group">
                                        <label className="field-label">Personal Email</label>
                                        <div className="field-input-wrap">
                                            <span className="field-icon"><FaEnvelope /></span>
                                            <input type="email" className="field-input" placeholder="owner@email.com"
                                                value={formData.owner.contact.email} onChange={(e) => handleChange('owner', 'contact', 'email', e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className="field-group">
                                        <label className="field-label">Password</label>
                                        <div className="field-input-wrap">
                                            <span className="field-icon"><FaLock /></span>
                                            <input type="password" minLength={8} className="field-input" placeholder="••••••••"
                                                value={formData.owner.account.password} onChange={(e) => handleChange('owner', 'account', 'password', e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className="field-group full-width">
                                        <label className="field-label">About the Owner (Bio)</label>
                                        <div className="field-input-wrap">
                                            <span className="field-icon"><FaInfoCircle /></span>
                                            <textarea className="field-input" placeholder="Brief professional background..."
                                                value={formData.owner.personalInfo.bio} onChange={(e) => handleChange('owner', 'personalInfo', 'bio', e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="reg-school-footer">
                                    <button type="button" className="reg-btn btn-sec" onClick={prevStep}>
                                        <FaChevronLeft /> <span>Back</span>
                                    </button>
                                    <button type="submit" className="reg-btn" disabled={isLoading}>
                                        {isLoading ? 'Processing...' : (
                                            <><span>Complete Registration</span> <FaPaperPlane /></>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </motion.div>
        </div>
    );
}

import React from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import schoolifyLogo from '../../assets/schoolify_logo_transparent (1).png';
import './SchoolsList.css';

const MOCK_SCHOOLS = [
    {
        id: 1,
        name: "كايرووووو International School",
        description: "هوهوهوهو ماااااااء",
        students: "2,480",
        teachers: "164",
        location: "Cairo, Egypt",
        type: "International"
    },
    {
        id: 2,
        name: "الشهيد احمد راضي",
        description: "اوسخ مدرسه فيكي يا مصر",
        students: "3,150",
        teachers: "210",
        location: "القلج",
        type: "Private"
    },
    {
        id: 3,
        name: "Alexandria STEM School",
        description: "Specialized in Science, Technology, Engineering, and Mathematics to prepare the next generation of innovators.",
        students: "1,200",
        teachers: "85",
        location: "Alexandria, Egypt",
        type: "Government"
    },
    {
        id: 4,
        name: "مضاميضووووو",
        description: "مدرستييييي اللي هقدم فيها عبث من العياb,frpljhmnk,b.gtf'Chgk,bgh,ggg,g,g,gg,g,g,,,gg,g,g,g,gg,g,g,g,g,gg,g,g,g,gر الثقييييل",
        students: "1,850",
        teachers: "125",
        location: "hohohohohohhoho",
        type: "Private"
    },
    {
        id: 5,
        name: "mohamonmvme",
        description: "mbplkfsd;bkv[hgkvlopkhgvl,od'golv;-p[d]oglvp=[e]dgkblvrp].",
        students: "950",
        teachers: "70",
        location: "nmgivkvdmvkdlv",
        type: "International"
    },
    {
        id: 6,
        name: "bfdl;br,fpls;",
        description: "m,bgmvdpdkvvvodggjr",
        students: "1,400",
        teachers: "95",
        location: "bmvfblvmdflfk",
        type: "Vocational"
    }
];

export default function SchoolsList({ onViewProfile }) {
    return (
        <div className="sl-page">
            <div className="sl-container">
                <header className="sl-header">
                    <p className="sl-overline">Directory</p>
                    <h1 className="sl-h1">Registered <span className="sl-accent">Schools</span></h1>
                    <p className="sl-sub">Explore the diverse network of institutions that trust Schoolify to power their educational journey.</p>
                </header>

                <div className="sl-grid">
                    {MOCK_SCHOOLS.map(school => (
                        <div key={school.id} className="sl-card">
                            <div className="sl-card-banner"></div>
                            <div className="sl-card-body">
                                <div className="sl-logo-wrap">
                                    <img src={schoolifyLogo} alt="School Logo" className="sl-school-logo" />
                                </div>
                                <div className="sl-card-info-main">
                                    <h2 className="sl-school-name">{school.name}</h2>
                                    <p className="sl-school-location">
                                        <FaMapMarkerAlt /> {school.location}
                                    </p>
                                    <p className="sl-school-desc">{school.description}</p>
                                </div>

                                <div className="sl-stats">
                                    <div className="sl-stat">
                                        <span className="sl-stat-icon"><FaUserGraduate /></span>
                                        <div className="sl-stat-info">
                                            <span className="sl-stat-val">{school.students}</span>
                                            <span className="sl-stat-label">Students</span>
                                        </div>
                                    </div>
                                    <div className="sl-stat">
                                        <span className="sl-stat-icon"><FaChalkboardTeacher /></span>
                                        <div className="sl-stat-info">
                                            <span className="sl-stat-val">{school.teachers}</span>
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
                    ))}
                </div>
            </div>
        </div>
    );
}

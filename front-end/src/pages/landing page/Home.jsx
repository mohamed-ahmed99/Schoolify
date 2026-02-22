import React, { useState, useEffect, useRef } from 'react';
import {
  FaArrowRight, FaCheck, FaChartLine, FaBell,
  FaShieldAlt, FaServer, FaUsers, FaGlobe, FaBars, FaTimes,
  FaSchool, FaUserTie, FaChalkboardTeacher, FaUserGraduate,
} from 'react-icons/fa';
import schoolifyLogo from '../../assets/schoolify_logo_transparent (1).png';
import './Home.css';

/* ── Static data ─────────────────────────────────── */
const NAV_LINKS = ['Features', 'Solutions', 'Testimonials', 'Team'];

const LOGOS = ['Harvard', 'MIT', 'Oxford', 'Stanford', 'Cambridge'];

const STATS = [
  { val: '50K+',   label: 'Active Users' },
  { val: '1,200+', label: 'Schools' },
  { val: '98%',    label: 'Satisfaction' },
  { val: '4.9★',   label: 'Average Rating' },
];

const FEATURES = [
  {
    icon: <FaChartLine />,
    label: 'Analytics Suite',
    title: 'Data-driven decisions at every level',
    body: 'From classroom performance to institution-wide KPIs, Schoolify surfaces the metrics that matter — in real time.',
    points: ['Live dashboards', 'Custom reports', 'Predictive insights'],
  },
  {
    icon: <FaShieldAlt />,
    label: 'Enterprise Security',
    title: 'Bank-grade protection for student data',
    body: 'End-to-end encryption, role-based access control, SSO support, and full GDPR compliance out of the box.',
    points: ['256-bit AES encryption', 'GDPR compliant', 'SOC 2 Type II'],
  },
  {
    icon: <FaBell />,
    label: 'Smart Automations',
    title: 'Eliminate repetitive admin work',
    body: 'Attendance tracking, grade publishing, parent notifications, and timetabling — all automated so your team focuses on education.',
    points: ['Auto attendance', 'Grade workflows', 'Parent alerts'],
  },
  {
    icon: <FaServer />,
    label: 'Multi-school Infrastructure',
    title: 'One platform, unlimited schools',
    body: 'Manage a single campus or a nationwide network. Schoolify scales with you — same interface, infinite capacity.',
    points: ['Unlimited campuses', 'Centralized billing', 'White-label ready'],
  },
];

const SOLUTIONS = [
  { icon: <FaUserTie />,           title: 'Platform Owners',   body: 'Oversee your entire network of schools from one unified control center with consolidated analytics and billing.' },
  { icon: <FaSchool />,            title: 'School Admins',     body: 'Streamline enrolment, staff scheduling, reporting, and communications — without the spreadsheets.' },
  { icon: <FaChalkboardTeacher />, title: 'Teachers',          body: 'Build lesson plans, auto-grade assignments, and monitor each student\'s progress in minutes, not hours.' },
  { icon: <FaUserGraduate />,      title: 'Students',          body: 'One clean dashboard for every class, assignment, grade, and announcement — always up to date.' },
];

const TESTIMONIALS = [
  { initial: 'S', name: 'Sarah Johnson',   role: 'Principal · Cairo International School',  quote: 'Schoolify cut our admin overhead by 60%. The leadership dashboard alone is worth the subscription.' },
  { initial: 'A', name: 'Ahmed Al-Rashid', role: 'Head of IT · Dubai Academy Group',         quote: 'Rolling out 14 campuses took two weeks. The SSO integration and role management are enterprise-grade.' },
  { initial: 'L', name: 'Layla Hassan',    role: 'Senior Teacher · Alexandria STEM School',  quote: 'I reclaim 6 hours every week that used to go to grading and report-writing. My students notice the difference.' },
];

const TEAM = [
{ initial: 'J', name: 'Jana',             role: 'AI & Mobile Dev',      color: '#06b6d4' },
{ initial: 'A', name: 'Asmaa',            role: 'Mobile Dev',          color: '#10b981' },
{ initial: 'M', name: 'Mohamed El Sayed', role: 'Front-end Engineer',   color: '#3b82f6' },
{ initial: 'M', name: 'Mohamed Ahmed',    role: 'Back-end Engineer',    color: '#8b5cf6' },
{ initial: 'R', name: 'Reda',             role: 'Back-end Engineer',      color: '#f59e0b' },
];

/* ── Animated number counter ─────────────────────── */
function Counter({ target }) {
  const [v, setV] = useState('0');
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    done.current = true;
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ''));
    const suffix  = target.replace(/[0-9.]/g, '');
    let cur = 0; const steps = 60;
    const inc = numeric / steps;
    const t = setInterval(() => {
      cur += inc;
      if (cur >= numeric) { setV(numeric % 1 === 0 ? numeric.toLocaleString() + suffix : numeric + suffix); clearInterval(t); }
      else setV(Math.floor(cur).toLocaleString() + suffix);
    }, 20);
    return () => clearInterval(t);
  }, [target]);
  return <>{v}</>;
}

/* ── Component ───────────────────────────────────── */
export default function Home({ onJoin }) {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [statsVis,  setStatsVis]  = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVis(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="lp">

      {/* ══ HERO ════════════════════════════════════ */}
      <section className="lp-hero" id="hero">
        <div className="lp-noise" />

        <div className="lp-hero-wrap">
          {/* Pill */}
          <div className="lp-pill">
            <span className="lp-pill-dot" />
            New: AI-Powered Grade Analytics — now live
          </div>

          {/* Headline */}
          <h1 className="lp-h1">
            The operating system<br />
            <span className="lp-accent">for modern schools</span>
          </h1>

          <p className="lp-subtitle">
            Schoolify gives owners, admins, teachers, and students a single, 
            beautifully designed platform — replacing disconnected tools with 
            one source of truth.
          </p>

          {/* CTAs */}
          <div className="lp-hero-cta">
            <button className="lp-btn lp-btn-primary" onClick={() => onJoin('register')}>
              Start for free
              <FaArrowRight className="lp-btn-icon" />
            </button>
            <button className="lp-btn lp-btn-ghost" onClick={() => onJoin('login')}>
              Sign in
            </button>
          </div>

          {/* Social proof */}
          <p className="lp-social-proof">
            Trusted by <strong>1,200+ schools</strong> across 40 countries
          </p>

          {/* Brand strip */}
          <div className="lp-brand-strip">
            {LOGOS.map((l) => (
              <span key={l} className="lp-brand-name">{l}</span>
            ))}
          </div>
        </div>

        {/* Hero visual */}
        <div className="lp-hero-visual">
          <div className="lp-card lp-card-main">
            <div className="lp-card-header">
              <img src={schoolifyLogo} alt="Schoolify" className="lp-card-logo" />
              <div>
                <p className="lp-card-title">School Dashboard</p>
                <p className="lp-card-sub">Cairo International School</p>
              </div>
            </div>
            <div className="lp-card-stats">
              <div className="lp-mini-stat"><span>Students</span><strong>2,480</strong></div>
              <div className="lp-mini-stat"><span>Teachers</span><strong>164</strong></div>
              <div className="lp-mini-stat"><span>Attendance</span><strong>96.4%</strong></div>
            </div>
            <div className="lp-bar-chart">
              {[70,85,60,90,75,88,95].map((h,i)=>(
                <div key={i} className="lp-bar" style={{height:`${h}%`, animationDelay:`${i*0.1}s`}} />
              ))}
            </div>
          </div>

          <div className="lp-card lp-card-notif">
            <FaBell className="lp-notif-icon" />
            <div>
              <p className="lp-notif-title">Report submitted</p>
              <p className="lp-notif-sub">Grade 10-B · 2 min ago</p>
            </div>
          </div>

          <div className="lp-card lp-card-users">
            <FaUsers className="lp-users-icon" />
            <p><strong>+340</strong> new students this week</p>
          </div>
        </div>
      </section>

      {/* ══ STATS ════════════════════════════════════ */}
      <section className="lp-stats" ref={statsRef} id="stats">
        <div className="lp-container lp-stats-grid">
          {STATS.map((s, i) => (
            <div className="lp-stat" key={i}>
              <span className="lp-stat-val">
                {statsVis ? <Counter target={s.val} /> : '—'}
              </span>
              <span className="lp-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FEATURES ═════════════════════════════════ */}
      <section className="lp-section" id="Features">
        <div className="lp-container">
          <div className="lp-section-header">
            <p className="lp-overline">Platform Capabilities</p>
            <h2 className="lp-h2">Everything your institution needs — <em>nothing it doesn't</em></h2>
          </div>

          <div className="lp-features-layout">
            {/* Sidebar tabs */}
            <div className="lp-feat-tabs">
              {FEATURES.map((f, i) => (
                <button
                  key={i}
                  className={`lp-feat-tab${activeFeature === i ? ' is-active' : ''}`}
                  onClick={() => setActiveFeature(i)}
                >
                  <span className="lp-feat-tab-icon">{f.icon}</span>
                  {f.label}
                </button>
              ))}
            </div>

            {/* Content panel */}
            <div className="lp-feat-panel" key={activeFeature}>
              <p className="lp-overline">{FEATURES[activeFeature].label}</p>
              <h3 className="lp-feat-title">{FEATURES[activeFeature].title}</h3>
              <p className="lp-feat-body">{FEATURES[activeFeature].body}</p>
              <ul className="lp-feat-list">
                {FEATURES[activeFeature].points.map((p, i) => (
                  <li key={i}>
                    <span className="lp-check"><FaCheck /></span>
                    {p}
                  </li>
                ))}
              </ul>
              <button className="lp-btn lp-btn-primary sm" onClick={() => onJoin('register')}>
                Get started <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SOLUTIONS ════════════════════════════════ */}
      <section className="lp-section lp-solutions-section" id="Solutions">
        <div className="lp-container">
          <div className="lp-section-header">
            <p className="lp-overline">Built for every role</p>
            <h2 className="lp-h2">One platform that speaks<br /><em>everyone's language</em></h2>
          </div>
          <div className="lp-solutions-grid">
            {SOLUTIONS.map((s, i) => (
              <div className="lp-sol-card" key={i}>
                <div className="lp-sol-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ═════════════════════════════ */}
      <section className="lp-section lp-testi-section" id="Testimonials">
        <div className="lp-container">
          <div className="lp-section-header">
            <p className="lp-overline">Customer stories</p>
            <h2 className="lp-h2">Trusted by education leaders</h2>
          </div>
          <div className="lp-testi-grid">
            {TESTIMONIALS.map((t, i) => (
              <div className="lp-testi-card" key={i}>
                <p className="lp-testi-quote">"{t.quote}"</p>
                <div className="lp-testi-footer">
                  <div className="lp-avatar">{t.initial}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TEAM ═════════════════════════════════════ */}
      <section className="lp-section" id="Team">
        <div className="lp-container">
          <div className="lp-section-header">
            <p className="lp-overline">The team</p>
            <h2 className="lp-h2">Built by a passionate <em>cross-functional team</em></h2>
          </div>
          <div className="lp-team-grid">
            {TEAM.map((m, i) => (
              <div className="lp-team-card" key={i}>
                <div className="lp-team-avatar" style={{ background: m.color }}>{m.initial}</div>
                <h4>{m.name}</h4>
                <p>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══════════════════════════════════════ */}
      <section className="lp-cta-section">
        <div className="lp-container lp-cta-inner">
          <div className="lp-cta-logo">
            <img src={schoolifyLogo} alt="Schoolify" />
          </div>
          <h2 className="lp-cta-heading">Ready to modernise your school?</h2>
          <p className="lp-cta-sub">
            Join over 1,200 institutions already running on Schoolify.
            No credit card required.
          </p>
          <div className="lp-cta-buttons">
            <button className="lp-btn lp-btn-primary lg" onClick={() => onJoin('register')}>
              Get started — it's free <FaArrowRight />
            </button>
            <button className="lp-btn lp-btn-ghost" onClick={() => onJoin('login')}>
              Sign in
            </button>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════ */}
      <footer className="lp-footer">
        <div className="lp-container lp-footer-inner">
          <div className="lp-footer-brand">
            <img src={schoolifyLogo} alt="Schoolify" />
            <span>Schoolify</span>
          </div>
          <p>© 2026 Schoolify · All rights reserved.</p>
          <div className="lp-footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

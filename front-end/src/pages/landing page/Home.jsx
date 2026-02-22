import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  { val: '50K+', label: 'Active Users' },
  { val: '1,200+', label: 'Schools' },
  { val: '98%', label: 'Satisfaction' },
  { val: '4.9★', label: 'Average Rating' },
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
  { icon: <FaUserTie />, title: 'Platform Owners', body: 'Oversee your entire network of schools from one unified control center with consolidated analytics and billing.' },
  { icon: <FaSchool />, title: 'School Admins', body: 'Streamline enrolment, staff scheduling, reporting, and communications — without the spreadsheets.' },
  { icon: <FaChalkboardTeacher />, title: 'Teachers', body: 'Build lesson plans, auto-grade assignments, and monitor each student\'s progress in minutes, not hours.' },
  { icon: <FaUserGraduate />, title: 'Students', body: 'One clean dashboard for every class, assignment, grade, and announcement — always up to date.' },
];

const TESTIMONIALS = [
  { initial: 'S', name: 'Sarah Johnson', role: 'Principal · Cairo International School', quote: 'Schoolify cut our admin overhead by 60%. The leadership dashboard alone is worth the subscription.' },
  { initial: 'A', name: 'Ahmed Al-Rashid', role: 'Head of IT · Dubai Academy Group', quote: 'Rolling out 14 campuses took two weeks. The SSO integration and role management are enterprise-grade.' },
  { initial: 'L', name: 'Layla Hassan', role: 'Senior Teacher · Alexandria STEM School', quote: 'I reclaim 6 hours every week that used to go to grading and report-writing. My students notice the difference.' },
];

const TEAM = [
  { initial: 'J', name: 'Jana', role: 'AI & Mobile Dev', color: '#06b6d4' },
  { initial: 'A', name: 'Asmaa', role: 'Mobile Dev', color: '#10b981' },
  { initial: 'M', name: 'Mohamed El Sayed', role: 'Front-end Engineer', color: '#3b82f6' },
  { initial: 'M', name: 'Mohamed Ahmed', role: 'Back-end Engineer', color: '#8b5cf6' },
  { initial: 'R', name: 'Reda', role: 'Back-end Engineer', color: '#f59e0b' },
];

/* ── Variants ────────────────────────────────────── */
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true }
};

/* ── Animated number counter ─────────────────────── */
function Counter({ target }) {
  const [v, setV] = useState('0');
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    done.current = true;
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ''));
    const suffix = target.replace(/[0-9.]/g, '');
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
  const [activeFeature, setActiveFeature] = useState(0);
  const [statsVis, setStatsVis] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVis(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="lp">

      {/* ══ HERO ════════════════════════════════════ */}
      <section className="lp-hero" id="hero">
        <div className="lp-noise" />

        <div className="lp-hero-wrap">
          <motion.div
            className="lp-pill"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="lp-pill-dot" />
            New: AI-Powered Grade Analytics — now live
          </motion.div>

          <motion.h1
            className="lp-h1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            The operating system<br />
            <span className="lp-accent">for modern schools</span>
          </motion.h1>

          <motion.p
            className="lp-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Schoolify gives owners, admins, teachers, and students a single,
            beautifully designed platform — replacing disconnected tools with
            one source of truth.
          </motion.p>

          <motion.div
            className="lp-hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button className="lp-btn lp-btn-primary" onClick={() => onJoin('register')}>
              Start for free
              <FaArrowRight className="lp-btn-icon" />
            </button>
            <button className="lp-btn lp-btn-ghost" onClick={() => onJoin('login')}>
              Sign in
            </button>
          </motion.div>

          <motion.p
            className="lp-social-proof"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.8 }}
          >
            Trusted by <strong>1,200+ schools</strong> across 40 countries
          </motion.p>

          <motion.div
            className="lp-brand-strip"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {LOGOS.map((l) => (
              <span key={l} className="lp-brand-name">{l}</span>
            ))}
          </motion.div>
        </div>

        {/* Hero visual */}
        <div className="lp-hero-visual">
          <motion.div
            className="lp-card lp-card-main"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
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
              {[70, 85, 60, 90, 75, 88, 95].map((h, i) => (
                <motion.div
                  key={i}
                  className="lp-bar"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 1 + (i * 0.1), duration: 0.5 }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="lp-card lp-card-notif"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <FaBell className="lp-notif-icon" />
            <div>
              <p className="lp-notif-title">Report submitted</p>
              <p className="lp-notif-sub">Grade 10-B · 2 min ago</p>
            </div>
          </motion.div>

          <motion.div
            className="lp-card lp-card-users"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
          >
            <FaUsers className="lp-users-icon" />
            <p><strong>+340</strong> new students this week</p>
          </motion.div>
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
      <motion.section
        className="lp-section"
        id="Features"
        {...fadeInUp}
      >
        <div className="lp-container">
          <div className="lp-section-header">
            <p className="lp-overline">Platform Capabilities</p>
            <h2 className="lp-h2">Everything your institution needs — <em>nothing it doesn't</em></h2>
          </div>

          <div className="lp-features-layout">
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

            <AnimatePresence mode="wait">
              <motion.div
                className="lp-feat-panel"
                key={activeFeature}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="lp-overline">{FEATURES[activeFeature].label}</p>
                <h3 className="lp-feat-title">{FEATURES[activeFeature].title}</h3>
                <p className="lp-feat-body">{FEATURES[activeFeature].body}</p>
                <ul className="lp-feat-list">
                  {FEATURES[activeFeature].points.map((p, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="lp-check"><FaCheck /></span>
                      {p}
                    </motion.li>
                  ))}
                </ul>
                <button className="lp-btn lp-btn-primary sm" onClick={() => onJoin('register')}>
                  Get started <FaArrowRight />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* ══ SOLUTIONS ════════════════════════════════ */}
      <motion.section
        className="lp-section lp-solutions-section"
        id="Solutions"
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="lp-container">
          <motion.div className="lp-section-header" variants={fadeInUp}>
            <p className="lp-overline">Built for every role</p>
            <h2 className="lp-h2">One platform that speaks<br /><em>everyone's language</em></h2>
          </motion.div>
          <div className="lp-solutions-grid">
            {SOLUTIONS.map((s, i) => (
              <motion.div
                className="lp-sol-card"
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <div className="lp-sol-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ══ TESTIMONIALS ═════════════════════════════ */}
      <motion.section
        className="lp-section lp-testi-section"
        id="Testimonials"
        {...fadeInUp}
      >
        <div className="lp-container">
          <div className="lp-section-header">
            <p className="lp-overline">Customer stories</p>
            <h2 className="lp-h2">Trusted by education leaders</h2>
          </div>
          <div className="lp-testi-grid">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                className="lp-testi-card"
                key={i}
                whileHover={{ scale: 1.02 }}
              >
                <p className="lp-testi-quote">"{t.quote}"</p>
                <div className="lp-testi-footer">
                  <div className="lp-avatar">{t.initial}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ══ TEAM ═════════════════════════════════════ */}
      <motion.section
        className="lp-section"
        id="Team"
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="lp-container">
          <motion.div className="lp-section-header" variants={fadeInUp}>
            <p className="lp-overline">The team</p>
            <h2 className="lp-h2">Built by a passionate <em>cross-functional team</em></h2>
          </motion.div>
          <div className="lp-team-grid">
            {TEAM.map((m, i) => (
              <motion.div
                className="lp-team-card"
                key={i}
                variants={fadeInUp}
              >
                <motion.div
                  className="lp-team-avatar"
                  style={{ background: m.color }}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                >
                  {m.initial}
                </motion.div>
                <h4>{m.name}</h4>
                <p>{m.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ══ CTA ══════════════════════════════════════ */}
      <motion.section
        className="lp-cta-section"
        {...fadeInUp}
      >
        <div className="lp-container lp-cta-inner">
          <motion.div
            className="lp-cta-logo"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <img src={schoolifyLogo} alt="Schoolify" />
          </motion.div>
          <h2 className="lp-cta-heading">Ready to modernise your school?</h2>
          <p className="lp-cta-sub">
            Join over 1,200 institutions already running on Schoolify.
            No credit card required.
          </p>
          <div className="lp-cta-buttons">
            <motion.button
              className="lp-btn lp-btn-primary lg"
              onClick={() => onJoin('register')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get started — it's free <FaArrowRight />
            </motion.button>
            <button className="lp-btn lp-btn-ghost" onClick={() => onJoin('login')}>
              Sign in
            </button>
          </div>
        </div>
      </motion.section>

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

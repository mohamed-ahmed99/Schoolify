import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaArrowRight, FaChartLine, FaShieldAlt,
  FaGlobe, FaBolt, FaMagic, FaStar,
  FaGraduationCap, FaUsers, FaBook
} from 'react-icons/fa';
import schoolifyLogo from '../../assets/schoolify_logo_transparent (1).png';
import { useTheme } from '../../context/ThemeContext';
import './Home.css';

/* ══════════════════════════════════════════════════════════════
   ULTRA-SMOOTH INTERACTIVE PARTICLE GRID
   ══════════════════════════════════════════════════════════════ */
const ParticleGrid = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, dots = [];
    const GAP = 30;
    const MOUSE_R = 200;
    const SPRING = 0.08;
    const FRICTION = 0.82;
    let mouse = { x: -9999, y: -9999 };
    let raf;

    class Dot {
      constructor(x, y) {
        this.baseX = x; this.baseY = y;
        this.x = x; this.y = y;
        this.vx = 0; this.vy = 0;
      }
      update() {
        const dx = mouse.x - this.baseX;
        const dy = mouse.y - this.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_R) {
          const f = (MOUSE_R - dist) / MOUSE_R;
          const a = Math.atan2(dy, dx);
          this.vx -= Math.cos(a) * f * 2.8;
          this.vy -= Math.sin(a) * f * 2.8;
        }
        this.vx += (this.baseX - this.x) * SPRING;
        this.vy += (this.baseY - this.y) * SPRING;
        this.vx *= FRICTION; this.vy *= FRICTION;
        this.x += this.vx; this.y += this.vy;
      }
      draw() {
        const dx = this.x - this.baseX;
        const dy = this.y - this.baseY;
        const d = Math.sqrt(dx * dx + dy * dy);
        const size = 1 + Math.min(d * 0.06, 2.5);
        const t = Math.min(d / 40, 1);

        // Detect theme to adjust dot color using context
        const isDark = theme === 'dark';
        const color = isDark ? '255, 255, 255' : '15, 15, 15';
        const baseAlpha = isDark ? 0.12 : 0.25;

        ctx.fillStyle = `rgba(${color}, ${baseAlpha + t * 0.65})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
        ctx.fill();

        if (d > 5) {
          ctx.strokeStyle = `rgba(${color}, ${t * 0.15})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(this.baseX, this.baseY);
          ctx.lineTo(this.x, this.y);
          ctx.stroke();
        }
      }
    }

    const init = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      dots = [];
      const cols = Math.ceil(width / GAP);
      const rows = Math.ceil(height / GAP);
      const ox = (width - (cols - 1) * GAP) / 2;
      const oy = (height - (rows - 1) * GAP) / 2;
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
          dots.push(new Dot(ox + c * GAP, oy + r * GAP));
    };

    const onResize = () => init();
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    init();

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (const dot of dots) { dot.update(); dot.draw(); }
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="sc-canvas" />;
};

/* ══════════════════════════════════════════════════════════════
   ANIMATED COUNTER — counts from 0 to target on scroll
   ══════════════════════════════════════════════════════════════ */
const Counter = ({ target, suffix = '', duration = 2000 }) => {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  // Parse the numeric part (handles "50K+", "1,200+", "99.9%", "4.9/5")
  const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ''));
  const isDecimal = target.includes('.');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * numericTarget;
      setValue(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, numericTarget, duration, isDecimal]);

  // Reconstruct the display string
  const display = (() => {
    if (target.includes('K')) return `${(value / 1000).toFixed(value >= 1000 ? 0 : 0)}K+`;
    if (target.includes(',')) return value.toLocaleString() + (target.includes('+') ? '+' : '');
    if (target.includes('%')) return `${value}%`;
    if (target.includes('/')) return `${value}/5`;
    return `${value}${suffix}`;
  })();

  return <span ref={ref} className="sc-stat-value">{display}</span>;
};

/* ── Scroll-triggered fade-up variants ────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] },
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const scrollFadeUp = (delay = 0) => ({
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.2 },
  variants: itemVariants
});

/* ══════════════════════════════════════════════════════════════
   HOME COMPONENT
   ══════════════════════════════════════════════════════════════ */
export default function Home({ onJoin }) {
  const stats = [
    { value: '50000', display: '50K+', label: 'Students Managed' },
    { value: '1200', display: '1,200+', label: 'Schools Connected' },
    { value: '99.9', display: '99.9%', label: 'System Uptime' },
    { value: '4.9', display: '4.9/5', label: 'Average Rating' },
  ];

  const team = [
    { initial: 'J', name: 'Jana', role: 'AI & Mobile Dev' },
    { initial: 'A', name: 'Asmaa', role: 'Mobile Dev' },
    { initial: 'M', name: 'Mohamed El Sayed', role: 'Front-end Engineer' },
    { initial: 'M', name: 'Mohamed Ahmed', role: 'Back-end Engineer' },
    { initial: 'R', name: 'Reda', role: 'Back-end Engineer' },
  ];

  return (
    <div className="sc-home">

      {/* ═══════ HERO ═══════════════════════════════════════ */}
      <section className="sc-hero">
        <ParticleGrid />
        <div className="sc-hero-radial" />

        <div className="sc-hero-content">
          <motion.div className="sc-pill" {...fadeUp(0)}>
            <FaGraduationCap className="sc-pill-icon" />
            Now serving 1,200+ schools worldwide
          </motion.div>

          <motion.h1 className="sc-title" {...fadeUp(0.1)}>
            The operating system<br />
            for <em>modern schools</em>
          </motion.h1>

          <motion.p className="sc-subtitle" {...fadeUp(0.2)}>
            Schoolify unifies administration, teaching, and learning into one seamless
            platform—so your institution can focus on what matters most: education.
          </motion.p>

          <motion.div className="sc-hero-actions" {...fadeUp(0.3)}>
            <button className="sc-btn sc-btn-primary" onClick={() => onJoin('register')}>
              Get Started <FaArrowRight />
            </button>
            <button className="sc-btn sc-btn-ghost" onClick={() => onJoin('login')}>
              Sign in to your school
            </button>
          </motion.div>

          <motion.div className="sc-proof" {...fadeUp(0.4)}>
            <div className="sc-avatars">
              {[1, 2, 3, 4, 5].map(i => <div key={i} className="sc-avatar-ring" />)}
            </div>
            <div className="sc-proof-info">
              <span className="sc-stars">{[...Array(5)].map((_, i) => <FaStar key={i} />)}</span>
              <span>Trusted by 1,000+ educators</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ STATS — ANIMATED COUNTERS ═════════════════ */}
      <section className="sc-stats">
        <div className="sc-container">
          <motion.div
            className="sc-stats-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {stats.map((s, i) => (
              <motion.div className="sc-stat" key={i} variants={itemVariants}>
                <Counter target={s.display} duration={2200} />
                <span className="sc-stat-label">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ FEATURES BENTO ════════════════════════════ */}
      <section className="sc-features">
        <div className="sc-container">
          <motion.div className="sc-section-head" {...scrollFadeUp(0)}>
            <span className="sc-section-tag"><FaBolt /> Core Platform</span>
            <h2>Everything your school needs,<br />nothing it doesn't</h2>
            <p>A curated set of tools designed specifically for the education workflow.</p>
          </motion.div>

          <motion.div
            className="sc-bento"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            <motion.div className="sc-card sc-card-large" variants={itemVariants}>
              <div className="sc-card-inner">
                <div className="sc-card-icon"><FaChartLine /></div>
                <h3>Predictive Analytics</h3>
                <p>Real-time dashboards that forecast student performance trends, identify at-risk learners, and optimise resource allocation across every department.</p>
              </div>
              <div className="sc-card-visual">
                <svg viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path className="sc-graph" d="M0,40 Q10,30 20,35 T40,20 T60,25 T80,5 T100,10" fill="none" />
                </svg>
              </div>
            </motion.div>

            <motion.div className="sc-card" variants={itemVariants}>
              <div className="sc-card-inner">
                <div className="sc-card-icon"><FaShieldAlt /></div>
                <h3>Bank-Grade Security</h3>
                <p>End-to-end encryption with role-based access ensures only the right people see the right data.</p>
              </div>
            </motion.div>

            <motion.div className="sc-card" variants={itemVariants}>
              <div className="sc-card-inner">
                <div className="sc-card-icon"><FaBook /></div>
                <h3>Smart Gradebook</h3>
                <p>Automated grading pipelines that adapt to your curriculum and generate parent-ready reports instantly.</p>
              </div>
            </motion.div>

            <motion.div className="sc-card sc-card-wide" variants={itemVariants}>
              <div className="sc-card-inner row">
                <div className="sc-card-icon"><FaGlobe /></div>
                <div>
                  <h3>Multi-Campus Architecture</h3>
                  <p>Deploy one platform across every campus. Each school gets its own secure workspace, unified under your brand.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ══════════════════════════════ */}
      <section className="sc-how">
        <div className="sc-container">
          <motion.div className="sc-section-head" {...scrollFadeUp(0)}>
            <span className="sc-section-tag"><FaUsers /> Workflow</span>
            <h2>From onboarding to graduation</h2>
            <p>Four steps to transform your institution.</p>
          </motion.div>
          <motion.div
            className="sc-steps"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {[
              { step: '01', title: 'Register your school', desc: 'Create your workspace in under 2 minutes with our guided setup.' },
              { step: '02', title: 'Add your team', desc: 'Invite administrators, teachers and staff with role-based permissions.' },
              { step: '03', title: 'Enrol students', desc: 'Bulk-import or manually add students. Parents get instant access.' },
              { step: '04', title: 'Go live', desc: 'Your digital campus is ready. Attendance, grades and comms—all in one place.' },
            ].map((s, i) => (
              <motion.div className="sc-step" key={i} variants={itemVariants} whileHover={{ y: -3 }}>
                <span className="sc-step-num">{s.step}</span>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ TEAM ═════════════════════════════════════ */}
      <section className="sc-team">
        <div className="sc-container">
          <motion.div className="sc-section-head" {...scrollFadeUp(0)}>
            <h2>Meet the Engineers</h2>
            <p>The cross-functional team behind Schoolify's precision architecture.</p>
          </motion.div>
          <motion.div
            className="sc-team-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {team.map((m, i) => (
              <motion.div className="sc-team-card" key={i} variants={itemVariants} whileHover={{ y: -4 }}>
                <div className="sc-team-avatar">{m.initial}</div>
                <h4>{m.name}</h4>
                <p>{m.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ CTA ══════════════════════════════════════ */}
      <section className="sc-cta">
        <div className="sc-container">
          <motion.h2 {...scrollFadeUp(0)}>Ready to modernise your school?</motion.h2>
          <motion.p {...scrollFadeUp(0.1)}>Join 1,200+ institutions already on Schoolify.</motion.p>
          <motion.button className="sc-btn sc-btn-primary sc-btn-lg" {...scrollFadeUp(0.2)} onClick={() => onJoin('register')}>
            Create your school workspace <FaArrowRight />
          </motion.button>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════════════════════════════════ */}
      <footer className="sc-footer">
        <div className="sc-container">
          <div className="sc-footer-brand">
            <img src={schoolifyLogo} alt="Schoolify" />
            <span>Schoolify</span>
          </div>
          <div className="sc-footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

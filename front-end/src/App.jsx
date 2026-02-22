import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/landing page/Home";
import SchoolsList from "./pages/Schools/SchoolsList";
import SchoolProfile from "./pages/Schools/SchoolProfile";
import OwnerProfile from "./pages/Profiles/OwnerProfile";
import AdminProfile from "./pages/Profiles/AdminProfile";
import TeacherProfile from "./pages/Profiles/TeacherProfile";
import StudentProfile from "./pages/Profiles/StudentProfile";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";

// Simple page variants
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

const PageWrapper = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [selectedSchool, setSelectedSchool] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleViewProfile = (school) => {
    setSelectedSchool(school);
    navigate(`/school/${school._id || school.id}`);
  };

  return (
    <ThemeProvider>
      <Navbar onNavigate={(page) => {
        if (page === 'home') navigate('/');
        else if (page === 'schools') navigate('/listSchool');
        else if (page === 'login') navigate('/login');
        else if (page === 'register') navigate('/register');
        else if (page === 'profile-owner') navigate('/profile/owner');
        else if (page === 'profile-admin') navigate('/profile/admin');
        else if (page === 'profile-teacher') navigate('/profile/teacher');
        else if (page === 'profile-student') navigate('/profile/student');
      }} />
      <main style={{ minHeight: 'calc(100vh - 70px)', overflowX: 'hidden' }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home onJoin={(mode) => navigate(`/${mode}`)} /></PageWrapper>} />
            <Route path="/login" element={<PageWrapper><Login onSwitch={() => navigate('/register')} /></PageWrapper>} />
            <Route path="/register" element={<PageWrapper><Register onSwitch={() => navigate('/login')} /></PageWrapper>} />
            <Route path="/listSchool" element={<PageWrapper><SchoolsList onViewProfile={handleViewProfile} /></PageWrapper>} />
            <Route path="/school/:id" element={<PageWrapper><SchoolProfile school={selectedSchool} onBack={() => navigate('/listSchool')} /></PageWrapper>} />

            {/* Dedicated Individual Profile Routes */}
            <Route path="/profile/owner" element={<PageWrapper><OwnerProfile /></PageWrapper>} />
            <Route path="/profile/admin" element={<PageWrapper><AdminProfile /></PageWrapper>} />
            <Route path="/profile/teacher" element={<PageWrapper><TeacherProfile /></PageWrapper>} />
            <Route path="/profile/student" element={<PageWrapper><StudentProfile /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>
    </ThemeProvider>
  );
}

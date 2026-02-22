import { useState, useEffect } from "react";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/landing page/Home";
import SchoolsList from "./pages/Schools/SchoolsList";
import SchoolProfile from "./pages/Schools/SchoolProfile";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedSchool, setSelectedSchool] = useState(null);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedSchool]);

  const handleViewProfile = (school) => {
    setSelectedSchool(school);
    setCurrentPage("profile");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "login":
        return <Login onSwitch={() => setCurrentPage("register")} />;
      case "register":
        return <Register onSwitch={() => setCurrentPage("login")} />;
      case "schools":
        return <SchoolsList onViewProfile={handleViewProfile} />;
      case "profile":
        return <SchoolProfile school={selectedSchool} onBack={() => setCurrentPage("schools")} />;
      default:
        return <Home onJoin={(mode) => setCurrentPage(mode)} />;
    }
  };

  return (
    <ThemeProvider>
      <Navbar onNavigate={(page) => setCurrentPage(page)} />
      <main style={{ minHeight: 'calc(100vh - 70px)' }}>
        {renderPage()}
      </main>
    </ThemeProvider>
  );
}

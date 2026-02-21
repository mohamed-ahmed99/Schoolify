import { useState } from "react";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  const [currentPage, setCurrentPage] = useState("login");

  return (
    <ThemeProvider>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 70px)' }}>
        {currentPage === "login" ? (
          <Login onSwitch={() => setCurrentPage("register")} />
        ) : (
          <Register onSwitch={() => setCurrentPage("login")} />
        )}
      </main>
    </ThemeProvider>
  );
}

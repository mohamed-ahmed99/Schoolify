import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  const [currentPage, setCurrentPage] = useState("login");

  return (
    <>
      {currentPage === "login" ? (
        <Login onSwitch={() => setCurrentPage("register")} />
      ) : (
        <Register onSwitch={() => setCurrentPage("login")} />
      )}
    </>
  );
}

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Header from "./components/Header";
import Popular from "./routes/Popular";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState("");
  const [theme, setTheme] = useState("dark-mode");

  // 로그인 상태와 테마를 로컬 스토리지에서 가져오기
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    const storedFullName = localStorage.getItem("fullName");
    const storedTheme = localStorage.getItem("theme") || "dark-mode";

    if (storedLoginStatus === "true" && storedFullName) {
      setIsLoggedIn(true);
      setFullName(storedFullName);
    }

    setTheme(storedTheme);
    document.documentElement.className = storedTheme; // 테마 반영
  }, []);

  // 회원가입 처리
  const handleSignup = (email, password, fullName) => {
    // 회원가입시 로컬스토리지에 사용자 정보 저장
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("fullName", fullName);

    // 로그인 상태로 변경
    setIsLoggedIn(true);
    setFullName(fullName);
    localStorage.setItem("isLoggedIn", "true");
  };

  // 로그인 처리
  const handleLogin = (email, password, keepLoggedIn) => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    const storedFullName = localStorage.getItem("fullName");

    if (email === storedEmail && password === storedPassword) {
      setIsLoggedIn(true);
      setFullName(storedFullName);
      if (keepLoggedIn) {
        localStorage.setItem("isLoggedIn", "true");
      } else {
        localStorage.setItem("isLoggedIn", "false");
      }
    } else {
      alert("Invalid email or password");
    }
  };

  // 로그아웃 처리
  const handleLogout = () => {
    setIsLoggedIn(false);
    setFullName("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("fullName");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  };

  // 테마 토글 처리
  const toggleTheme = () => {
    const newTheme = theme === "dark-mode" ? "light-mode" : "dark-mode";
    setTheme(newTheme);
    document.documentElement.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Router>
      {/* Header 컴포넌트를 전체 페이지에 고정 */}
      <Header
        isLoggedIn={isLoggedIn}
        fullName={fullName}
        onLogout={handleLogout}
        onToggleTheme={toggleTheme}
        currentTheme={theme}
      />

      {/* 페이지 라우팅 */}
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie/:id" element={<Detail />} />
        <Route
          path="/"
          element={<Home isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

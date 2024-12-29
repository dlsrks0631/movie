// Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function Login({ onLogin }) {
  // 일반 로그인용 상태
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  // 라우터 이동 훅
  const navigate = useNavigate();

  /**
   * [1] 일반 로그인 버튼 클릭 시
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // 부모(App.js)로부터 받은 onLogin 호출
    onLogin(email, password, keepLoggedIn);
    // 메인 페이지로 이동
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Login to NETFLEX</h2>

        {/* [A] 일반 로그인 폼 */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.keepLoggedInGroup}>
            <input
              type="checkbox"
              checked={keepLoggedIn}
              onChange={(e) => setKeepLoggedIn(e.target.checked)}
            />
            <label>Keep me logged in</label>
          </div>

          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>

        {/* [C] 회원가입 안내 */}
        <p className={styles.signupPrompt}>
          Don't have an account?{" "}
          <Link to="/signup" className={styles.signupLink}>
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

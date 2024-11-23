import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const navigate = useNavigate(); // useNavigate to handle redirection

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password, keepLoggedIn);
    navigate("/"); // Redirect to home after login
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Login to NETFLEX</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
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

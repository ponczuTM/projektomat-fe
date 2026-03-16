"use client";

import { useState } from "react";
import styles from "./login.module.css";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    alert("Login jeszcze nie działa");
  }

  return (
    <main className={styles.container}>
      <h1>Logowanie</h1>

      <form onSubmit={handleSubmit} className={styles.form}>

        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className={styles.input}
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.button} type="submit">
          Zaloguj się
        </button>

      </form>
    </main>
  );
}
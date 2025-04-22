import { useState } from 'react';
import { signInWithGoogle } from '../lib/firebase';
import styles from './Auth.module.css';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle regular email login
  };

  return (
    <div className={styles.authContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        
        <div className={styles.divider}>
          <span>OR</span>
        </div>
        
        <button 
          type="button" 
          onClick={signInWithGoogle}
          className={styles.googleButton}
        >
          <img src="/google-icon.png" alt="Google" />
          Continue with Google
        </button>
      </form>
    </div>
  );
}

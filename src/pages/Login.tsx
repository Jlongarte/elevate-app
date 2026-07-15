import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Common/Button';
import '../styles/Auth.css';

const Login: React.FC = () => {
  const { handleLogin, error } = useAuth();
  const [searchParams] = useSearchParams();
  
  // Si venimos redirigidos del carrito porque hay que estar logueado, lo guardamos para volver allí
  const redirect = searchParams.get('redirect') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLocalLoading, setIsLocalLoading] = useState(false); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim() && !isLocalLoading) {
      setIsLocalLoading(true);
      try {
        await handleLogin(email, password, redirect);
      } catch (err) {
        setIsLocalLoading(false);
      }
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <h2>SIGN IN</h2>
        <p className="auth-subtitle">Access your account to manage orders and check out.</p>

        {error && <div className="auth-error-banner">{error.toUpperCase()}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label>EMAIL ADDRESS</label>
            <input
              type="email"
              required
              placeholder="example@elevate.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLocalLoading}
            />
          </div>

          <div className="auth-field">
            <label>PASSWORD</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLocalLoading}
            />
          </div>

          <Button variant="primary" type="submit" disabled={isLocalLoading}>
            {isLocalLoading ? 'SIGNING IN...' : 'SIGN IN'}
          </Button>
        </form>

        <div className="auth-footer">
          <span>DON'T HAVE AN ACCOUNT? </span>
          <Link to={`/register?redirect=${redirect}`} className="auth-link">
            CREATE ACCOUNT
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
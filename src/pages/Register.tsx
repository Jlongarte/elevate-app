import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Common/Button';
import '../styles/Auth.css';

const Register: React.FC = () => {
  const { handleRegister, isLoading, error } = useAuth();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && password.trim()) {
      handleRegister(name, email, password);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <h2>CREATE ACCOUNT</h2>
        <p className="auth-subtitle">Join Elevate to track your premium shipments and training stats.</p>

        {error && <div className="auth-error-banner">{error.toUpperCase()}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label>FULL NAME</label>
            <input
              type="text"
              required
              placeholder="YOUR NAME"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label>EMAIL ADDRESS</label>
            <input
              type="email"
              required
              placeholder="example@elevate.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label>PASSWORD</label>
            <input
              type="password"
              required
              placeholder="MINIMUM 6 CHARACTERS"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'CREATING ACCOUNT...' : 'REGISTER'}
          </Button>
        </form>

        <div className="auth-footer">
          <span>ALREADY HAVE AN ACCOUNT? </span>
          <Link to={`/login?redirect=${redirect}`} className="auth-link">
            SIGN IN
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
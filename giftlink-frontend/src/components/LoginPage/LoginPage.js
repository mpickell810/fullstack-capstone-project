import React, { useEffect, useState } from 'react';
import {urlConfig} from '../../config';
import { useAppContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [incorrect, setIncorrect] = useState('');
    const navigate = useNavigate();

    const bearerToken = sessionStorage.getItem('auth-token') || sessionStorage.getItem('bearer-token');
    const { setIsLoggedIn } = useAppContext();
        
    useEffect(() => {
        if (sessionStorage.getItem('auth-token')) {
          navigate('/app')
          }
        }, [navigate])

const handleLogin = async (e) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    try{
      const response = await fetch(`${urlConfig}/api/auth/login`, {
		   method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(bearerToken ? { Authorization: `Bearer ${bearerToken}` } : {}), // Include Bearer token if available
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });
    const json = await response.json();

    if (json && json.authtoken) {
        sessionStorage.setItem('auth-token', json.authtoken);
        if (json.userName) sessionStorage.setItem('name', json.userName);
        if (json.userEmail) sessionStorage.setItem('email', json.userEmail);
        if (typeof setIsLoggedIn === 'function') setIsLoggedIn(true);
        navigate('/app');
    } else {
        // Clear controlled inputs via state
        setEmail('');
        setPassword('');
        setIncorrect("Wrong password. Try again.");
        setTimeout(() => setIncorrect(''), 2000);
    }
	}catch (err) {
        console.error('Error fetching details:', err);
        setIncorrect('Login failed. Please try again.');
        setTimeout(() => setIncorrect(''), 3000);
    }
};        

	return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="login-card p-4 border rounded">
              <h2 className="text-center mb-4 font-weight-bold">Login</h2>

        <form onSubmit={handleLogin}>
  		<div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
                id="email"
                type="text"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>

        <div className="mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        <span style={{ color:'red', height:'.5cm', display:'block', fontStyle:'italic', fontSize:'12px' }}>{incorrect}</span>
        </div>

  		<button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
        </form>
		<p className="mt-4 text-center">
			New here? <Link to="/app/register" className="text-primary">Register Here</Link>
		</p>

            </div>
          </div>
        </div>
      </div>
    );
}
export default LoginPage;

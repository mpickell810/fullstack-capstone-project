import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AuthContext';

export default function Navbar() {
    const { isLoggedIn, setIsLoggedIn, userName, setUserName } = useAppContext();
    const navigate=useNavigate();

    useEffect(() => {
        const authTokenFromSession = sessionStorage.getItem('auth-token');
        const nameFromSession = sessionStorage.getItem('name');
        
        // Safely sync session storage to React context on mount/refresh
        if (authTokenFromSession && nameFromSession) {
            setUserName(nameFromSession);
            setIsLoggedIn(true);
        }
    }, [setIsLoggedIn, setUserName]);

    const handleLogout = () =>{
        sessionStorage.clear();
        setIsLoggedIn(false);
        navigate(`/login`);
};
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/app">GiftLink</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/home.html">Home</a> {/* Link to home.html */}
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/app">Gifts</Link> {/* Updated Link */}
                </li>
                <li className="nav-item">
	                <Link className="nav-link" to="/app/search">Search</Link>
                </li>
                <ul className="navbar-nav ml-auto">
                {isLoggedIn ? (
                                    <>
                                    <li className="nav-item"> 
                                        <Link className="nav-link" style={{ color: "black", fontweight:"bold" }} to="/app/profile">
                                            Welcome, {userName}
                                        </Link> 
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link login-btn" onClick={handleLogout}>Logout</button>
                                    </li>
                                    </>
                                    )  : (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link login-btn" to="/app/login">Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link register-btn" to="/app/register">Register</Link>
                                        </li>
                                    </>
                                )}            
                        </ul>
                </ul>
            </div>
        </nav>
    );
}

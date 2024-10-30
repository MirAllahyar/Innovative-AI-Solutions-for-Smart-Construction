import React, { useState } from 'react';
import axios from 'axios';
import './SignupPage.css'; // Make sure you have the CSS file
import logo from '../../assets/images/IMG-20241014-WA0010.jpg'; // Your logo path

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); // Add state for email
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User'); // Default role
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', {
                username,
                email, // Send email to backend
                password,
                role,
            });

            // Handle successful signup
            console.log('Signup successful:', response.data);
            window.location.href = '/login'; // Redirect to login page
        } catch (error) {
            // Error handling
            if (error.response) {
                console.error('Signup error:', error.response.data);
                setErrorMessage(error.response.data.message);
            } else {
                console.error('Signup error:', error.message);
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="signup-page">
            <header className="signup-header">
                <div className="logo">
                    <img src={logo} alt="Smart Construction Logo" />
                    <h1>Smart Construction</h1>
                </div>
            </header>
            <div className="signup-container">
                <form onSubmit={handleSignup} className="signup-form">
                    <h2>Sign Up</h2>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className="input-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Update email state
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Role</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="User">User</option>
                            <option value="Contractor">Contractor</option>
                            <option value="ServiceProvider">Service Provider</option>
                        </select>
                    </div>
                    <button type="submit" className="btn-signup">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/api/login", {
                email,
                password,
            });

            if (res.status === 200) {
                console.log("Login successful:", res.data);
                localStorage.setItem("email", res.data.user.email);
                console.log("User saved to localStorage");

                localStorage.setItem("email", res.data.user.email);
                // Redirect to dashboard
                navigate('/dashboard');
            }
        } catch (err) {
            console.error("Login error:", err);
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="d-flex justify-content-center align-items-start vh-100 pt-5 bg-light">
                <div className="p-5 bg-white rounded shadow" style={{ minWidth: '350px' }}>
                    <h3 className="text-center mb-4 text-primary">Login to MeetSphere</h3>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                type="email"
                                className={`form-control ${emailError ? 'is-invalid' : ''}`}
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {emailError && <div className="invalid-feedback">{emailError}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
                    </form>

                    <div className="mt-3 text-center">
                        <small>
                            New user? <a href="/signup">Sign up here</a>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

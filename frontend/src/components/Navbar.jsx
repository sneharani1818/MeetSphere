import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid d-flex justify-content-between align-items-center container">

                    {/* Logo and Brand */}
                    <div className="d-flex align-items-center">
                        <a className="navbar-brand" href="">
                            <img src="/logo.png" alt="Logo" className="d-inline-block align-text-top mx-2" width="70" onClick={() => navigate('/')} />
                        </a>
                        {/* <span className="fw-bold fs-4">MeetSphere</span> */}
                    </div>

                    {/* Slogan */}
                    <div className="text-center">
                        <span className="fw-semibold fs-5">Chat. Call. Collaborate.</span>
                    </div>

                    {/* Date and Time */}
                    <div className="text-end d-flex flex-col">
                        <div className='mx-4 px-2'>
                            <h6 className="mb-0">{dateTime.toLocaleDateString()}</h6>
                            <small>{dateTime.toLocaleTimeString()}</small>
                        </div>
                        <button type="button" className="btn btn-secondary px-4 mx-2" onClick={() => navigate('/login')}>Login</button>
                        <button type="button" className="btn btn-outline-secondary px-4" onClick={() => navigate('/signup')}>Sign Up</button>
                    </div>

                    {/* Login and Sign up page */}
                    {/* <div className="mt-4 d-flex gap-3">
                        
                    </div> */}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;

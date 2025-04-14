import React from 'react';
import Navbar from './../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Navbar />

            <div className="container mt-5">
                <div className="row">
                    {/* Left Side */}
                    <div className="col-md-6 d-flex flex-column justify-content-between p-4">
                        <div>
                            <h1 className="text-dark fw-bold">MeetSphere!</h1>
                            <p className="mt-3 text-secondary">
                                MeetSphere is your all-in-one communication platform — enabling seamless text chat, high-quality video conferencing, screen sharing, real-time collaboration, and file sharing in a secure environment. Whether you're working remotely, attending online classes, or catching up with friends, MeetSphere brings everyone together.
                            </p>
                            <div className="mt-4 d-flex gap-3">
                                <button type="button" className="btn btn-outline-secondary" style={{ width: '120px', height: '120px' }} onClick={() => navigate('/login')}>Join Meeting</button>
                                <button type="button" className="btn btn-outline-secondary" style={{ width: '120px', height: '120px' }} onClick={() => navigate('/login')}>New Meeting</button>
                            </div>
                        </div>
                        <hr />
                        <footer className="text-muted mt-4">
                            &copy; 2025 MeetSphere. All rights reserved.
                        </footer>
                    </div>

                    {/* Right Side: Carousel */}
                    <div className="col-md-6 p-4">
                        <div id="featureCarousel" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner text-center">
                                <div className="carousel-item active">
                                    <img src="/feature1.png" className="d-block mx-auto" alt="Plan ahead" style={{ width: '75%', maxHeight: '75vh', objectFit: 'contain' }} />
                                    <h4 className="mt-4 fw-semibold text-dark">Plan ahead</h4>
                                    <p className="text-secondary">
                                        Click <strong>New meeting</strong> to schedule meetings with peers
                                    </p>
                                </div>
                                <div className="carousel-item">
                                    <img src="/feature2.png" className="d-block mx-auto" alt="Chat" style={{ width: '75%', maxHeight: '75vh', objectFit: 'contain' }} />
                                    <h4 className="mt-4 fw-semibold text-dark">Video Conference</h4>
                                    <p className="text-secondary">
                                        Join <strong>video meetings</strong> with just one click — clear, fast, and reliable
                                    </p>
                                </div>
                                <div className="carousel-item">
                                    <img src="/feature3.png" className="d-block mx-auto" alt="Video call" style={{ width: '75%', maxHeight: '75vh', objectFit: 'contain' }} />
                                    <h4 className="mt-4 fw-semibold text-dark">Instant Messaging</h4>
                                    <p className="text-secondary">
                                        Use <strong>Chat</strong> to instantly message teammates and share files in real-time
                                    </p>
                                </div>
                            </div>

                            {/* Navigation Arrows */}
                            <button className="carousel-control-prev" type="button" data-bs-target="#featureCarousel" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon bg-secondary rounded-circle" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#featureCarousel" data-bs-slide="next">
                                <span className="carousel-control-next-icon bg-secondary rounded-circle" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>

                            {/* Dot indicators */}
                            <div className="carousel-indicators mt-3">
                                <button type="button" data-bs-target="#featureCarousel" data-bs-slide-to="0" className="active bg-secondary rounded-circle" aria-current="true"></button>
                                <button type="button" data-bs-target="#featureCarousel" data-bs-slide-to="1" className="bg-secondary rounded-circle"></button>
                                <button type="button" data-bs-target="#featureCarousel" data-bs-slide-to="2" className="bg-secondary rounded-circle"></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

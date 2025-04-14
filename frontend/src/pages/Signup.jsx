import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        let tempErrors = {};

        if (!formData.firstName.trim()) tempErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) tempErrors.lastName = "Last name is required";
        if (!emailRegex.test(formData.email)) tempErrors.email = "Invalid email format";
        if (!passwordRegex.test(formData.password)) {
            tempErrors.password = "Password must be 8+ characters and include uppercase, lowercase, digit, and special character";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const res = await fetch("http://localhost:5000/api/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                const data = await res.json();
                if (res.ok) {
                    alert("Signup successful!");
                    // navigate to login or home page
                } else {
                    alert(data.error || "Signup failed");
                }
            } catch (err) {
                console.error("Error signing up:", err);
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
                <div className="border rounded p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
                    <h3 className="mb-4 text-center text-dark">Create an Account</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <input
                                type="text"
                                className={`form-control ${errors.firstName && 'is-invalid'}`}
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input
                                type="text"
                                className={`form-control ${errors.lastName && 'is-invalid'}`}
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className={`form-control ${errors.email && 'is-invalid'}`}
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className={`form-control ${errors.password && 'is-invalid'}`}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>

                        <button type="submit" className="btn btn-dark w-100">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;

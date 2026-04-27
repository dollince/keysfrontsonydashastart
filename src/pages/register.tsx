import React, { useState } from 'react';
import './login.css'; // используем тот же стиль

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Данные регистрации:', { name, email, password });
    };

    return (
        <div className="login-container">
            <div className="login-form">

                {/* Шапка */}
                <div className="login-header">
                    <h1 className="login-title">Registration</h1>
                    <span className="close-icon" onClick={() => window.location.href = '/'}>
                        X
                    </span>
                </div>

                <form className="form-content" onSubmit={handleSubmit}>

                    {/* Name */}
                    <div className="form-group-combined">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="enter"
                            required
                        />
                    </div>

                    {/* Mail */}
                    <div className="form-group-combined">
                        <label htmlFor="email">Mail</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="enter"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="form-group-combined">
                        <label htmlFor="password">Password</label>
                        <div style={{ position: 'relative', width: '100%' }}>
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="enter"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '20px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#5B8064',
                                    fontSize: '1.2rem'
                                }}
                            >
                                {showPassword ? '👁' : '👁‍🗨'}
                            </button>
                        </div>
                    </div>

                    {/* Кнопка */}
                    <button type="submit" className="login-btn">
                        Register
                    </button>

                    {/* Ссылка */}
                    <p className="register-link">
                        Already have an account? <a href="/login">Log in</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
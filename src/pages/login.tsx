import React, { useState } from 'react';
import './login.css';

const Login: React.FC = () => {
    // Состояния для полей ввода
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Функция обработки отправки формы
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Данные для входа:', { email, password });
    };

    return (
        <div className="login-container">
            <div className="login-form">

                {/* Шапка формы: Log по центру, крестик справа */}
                <div className="login-header">
                    <h1 className="login-title">Log</h1>
                    <span className="close-icon" onClick={() => console.log('Close clicked')}>X</span>
                </div>

                <form className="form-content" onSubmit={handleSubmit}>

                    {/* Поле Mail */}
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

                    {/* Поле Password с кнопкой "глаз" */}
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
                                className="password-toggle"
                                style={{
                                    position: 'absolute',
                                    right: '20px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#5B8064',
                                    fontSize: '1.2rem',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                {showPassword ? '👁' : '👁‍🗨'}
                            </button>
                        </div>
                    </div>

                    {/* Кнопка входа: центрирована через CSS */}
                    <button type="submit" className="login-btn">
                        Log in
                    </button>

                    {/* Ссылка под формой */}
                    <p className="register-link">
                        Don’t have an account? <a href="/register">Register now.</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
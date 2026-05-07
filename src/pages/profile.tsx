import React, { useState, useEffect } from 'react';
import './profile.css';

const Profile: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [skills, setSkills] = useState('...');
    const [description, setDescription] = useState('...');

    // Буфер для хранения данных до начала редактирования
    const [tempData, setTempData] = useState({ name: '', email: '', skills: '', description: '' });
    const [isEditing, setIsEditing] = useState(false);

    // Состояния для смены пароля
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch('http://localhost:8080/api/users/me', {
                headers: { 'Authorization': 'Bearer ' + token }
            })
                .then(res => res.json())
                .then(data => {
                    setName(data.name || '');
                    setEmail(data.email || '');
                    setSkills(data.skills || '');
                    setDescription(data.description || '');
                })
                .catch(() => console.log("Бэкенд недоступен"));
        }
    }, []);

    // Функция входа в режим редактирования
    const startEditing = () => {
        setTempData({ name, email, skills, description });
        setIsEditing(true);
    };

    // Функция отмены
    const handleCancel = () => {
        setName(tempData.name);
        setEmail(tempData.email);
        setSkills(tempData.skills);
        setDescription(tempData.description);
        setIsEditing(false);
    };

    const handleSave = () => {
        setIsEditing(false);
        console.log('Данные сохранены в БД:', { name, email, skills, description });
    };

    // Открыть/закрыть модалку смены пароля
    const openPasswordModal = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordError('');
        setPasswordSuccess('');
        setIsPasswordModalOpen(true);
    };

    const closePasswordModal = () => {
        setIsPasswordModalOpen(false);
    };

    // Отправка нового пароля
    const handlePasswordChange = async () => {
        setPasswordError('');
        setPasswordSuccess('');

        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordError('Please fill in all fields.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError('New passwords do not match.');
            return;
        }

        if (newPassword.length < 6) {
            setPasswordError('New password must be at least 6 characters.');
            return;
        }

        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:8080/api/users/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ currentPassword, newPassword })
            });

            if (response.ok) {
                setPasswordSuccess('Password changed successfully!');
                setTimeout(() => closePasswordModal(), 1500);
            } else {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    setPasswordError(data.message || 'Error changing password.');
                } else {
                    const text = await response.text();
                    setPasswordError(text || 'Error changing password.');
                }
            }
        } catch {
            setPasswordError('Server is unavailable. Try again later.');
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-field">
                    <label>Name</label>
                    {isEditing ? (
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    ) : (
                        <p className="profile-value">{name || 'Не указано'}</p>
                    )}
                </div>

                <div className="profile-field">
                    <label>Mail</label>
                    {isEditing ? (
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    ) : (
                        <p className="profile-value">{email || 'Не указано'}</p>
                    )}
                </div>

                <div className="profile-field">
                    <label>Skills</label>
                    {isEditing ? (
                        <textarea value={skills} onChange={(e) => setSkills(e.target.value)} rows={3} />
                    ) : (
                        <p className="profile-value">{skills || 'Пусто'}</p>
                    )}
                </div>

                <div className="profile-field">
                    <label>Description</label>
                    {isEditing ? (
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} />
                    ) : (
                        <p className="profile-value">{description || 'Пусто'}</p>
                    )}
                </div>

                <div className="profile-actions">
                    {isEditing ? (
                        <>
                            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                            <button className="save-btn" onClick={handleSave}>Save Changes</button>
                        </>
                    ) : (
                        <>
                            {/* Change Password теперь первая, Edit Profile — вторая */}
                            <button className="change-pass-btn" onClick={openPasswordModal}>Change Password</button>
                            <button className="edit-btn" onClick={startEditing}>Edit Profile</button>
                        </>
                    )}
                </div>

                <div className="teams-section">
                    <h3 className="teams-title">My teams</h3>
                    <div className="teams-list">
                        <div className="team-item empty">
                            <p className="empty-text">No teams yet. Join or create your first team!</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Модальное окно смены пароля */}
            {isPasswordModalOpen && (
                <div className="modal-overlay" onClick={closePasswordModal}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">Change Password</h2>
                            <span className="modal-close" onClick={closePasswordModal}>X</span>
                        </div>

                        <div className="modal-body">
                            <div className="form-group-combined">
                                <label>Current Password</label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="enter"
                                />
                            </div>

                            <div className="form-group-combined">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="enter"
                                />
                            </div>

                            <div className="form-group-combined">
                                <label>Confirm New Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="enter"
                                />
                            </div>

                            {passwordError && <p className="password-error">{passwordError}</p>}
                            {passwordSuccess && <p className="password-success">{passwordSuccess}</p>}

                            <button className="save-btn modal-save-btn" onClick={handlePasswordChange}>
                                Save Password
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
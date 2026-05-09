import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HouseIcon } from '../icons/houseicon';
import { PlusIcon } from '../icons/plusicon';
import './Header.css';

interface HeaderProps {
    onCreateTeam?: () => void;
    onProfile?: () => void;
    isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ onCreateTeam, onProfile, isLoggedIn }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isHomePage = location.pathname === '/';

    const handleIconClick = () => {
        if (isHomePage) {
            if (onCreateTeam) onCreateTeam();
        } else {
            navigate('/');
        }
    };

    const handleProfileClick = () => {
        if (!isLoggedIn) {
            // Не залогинен — вызываем обработчик из App (покажет модалку)
            if (onProfile) onProfile();
        } else {
            navigate('/profile');
        }
    };

    return (
        <header className="main-header">
            <div className="home-icon-container" onClick={handleIconClick} title={isHomePage ? "Создать команду" : "На главную"}>
                {isHomePage ? (
                    <PlusIcon className="home-icon" color="#2d5a3b" />
                ) : (
                    <HouseIcon className="home-icon" color="#2d5a3b" />
                )}
            </div>

            <div className="header-title">name</div>

            <div className="header-profile-link" onClick={handleProfileClick}>
                profile
            </div>
        </header>
    );
};

export default Header;
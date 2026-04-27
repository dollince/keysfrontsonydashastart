import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HouseIcon } from '../icons/HouseIcon';
import { PlusIcon } from '../icons/PlusIcon';
import './Header.css';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Проверяем, на главной ли мы странице
    const isHomePage = location.pathname === '/';

    const handleIconClick = () => {
        if (isHomePage) {
            console.log('Создать новый проект');
            // Позже: navigate('/create-project');
        } else {
            navigate('/');
        }
    };

    return (
        <header className="main-header">
            <div className="home-icon-container" onClick={handleIconClick} title={isHomePage ? "Создать" : "На главную"}>
                {isHomePage ? (
                    <PlusIcon className="home-icon" color="#2d5a3b" />  // ← плюсик на главной
                ) : (
                    <HouseIcon className="home-icon" color="#2d5a3b" />  // ← домик на других страницах
                )}
            </div>
            <div className="header-title">name</div>
            <div className="header-spacer"></div>
        </header>
    );
};

export default Header;
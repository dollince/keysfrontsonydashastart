import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <header className="main-header">
            <div className="home-icon-container" onClick={() => navigate('/')} title="На главную">
                {/* Иконка дома на Unicode (или можно SVG) */}
                <span className="home-icon">🏠</span>
            </div>
            <div className="header-title">name</div>
            <div className="header-spacer"></div> {/* Для баланса центровки */}
        </header>
    );
};

export default Header;
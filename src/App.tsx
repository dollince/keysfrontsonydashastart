import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/login';
import Register from './pages/register';

function App() {
    return (
        <Router>
            <Header />
            <div style={{ paddingTop: '60px' }}>
                <Routes>
                    <Route path="/" element={<div style={{ textAlign: 'center', marginTop: '50px' }}>Главная страница</div>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/login';
import Register from './pages/register';
import Profile from './pages/profile';
import HomePage from './pages/home';
import './pages/profile.css';

export interface Team {
    id: number;
    name: string;
    goals: string;
    roles: string;
    description: string;
}

function CreateTeamModal({ onClose, onSave }: {
    onClose: () => void;
    onSave: (team: Omit<Team, 'id'>) => void;
}) {
    const [teamName, setTeamName] = useState('');
    const [goals, setGoals] = useState('');
    const [roles, setRoles] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSave = () => {
        if (!teamName.trim()) {
            setError('Please enter a team name.');
            return;
        }
        onSave({ name: teamName, goals, roles, description });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">Create Team</h2>
                    <span className="modal-close" onClick={onClose}>X</span>
                </div>
                <div className="modal-body">
                    <div className="form-group-combined">
                        <label>Team Name</label>
                        <input
                            type="text"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            placeholder="enter team name"
                        />
                    </div>
                    <div className="form-group-combined">
                        <label>Project Goals</label>
                        <textarea
                            value={goals}
                            onChange={(e) => setGoals(e.target.value)}
                            placeholder="what do you want to achieve?"
                            rows={3}
                            style={{ background: '#EDF0E8', border: 'none', borderRadius: '0 0 12px 12px', padding: '12px 20px', fontSize: '1rem', color: '#333', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                        />
                    </div>
                    <div className="form-group-combined">
                        <label>Roles Needed</label>
                        <input
                            type="text"
                            value={roles}
                            onChange={(e) => setRoles(e.target.value)}
                            placeholder="e.g. designer, backend dev..."
                        />
                    </div>
                    <div className="form-group-combined">
                        <label>Project Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="describe your project..."
                            rows={4}
                            style={{ background: '#EDF0E8', border: 'none', borderRadius: '0 0 12px 12px', padding: '12px 20px', fontSize: '1rem', color: '#333', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                        />
                    </div>
                    {error && <p className="password-error">{error}</p>}
                    <button className="save-btn modal-save-btn" onClick={handleSave}>
                        Create Team
                    </button>
                </div>
            </div>
        </div>
    );
}

// Модалка с предложением зарегистрироваться
function NeedAuthModal({ onClose }: { onClose: () => void }) {
    const navigate = useNavigate();

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">Sign in required</h2>
                    <span className="modal-close" onClick={onClose}>X</span>
                </div>
                <div className="modal-body">
                    <p style={{ color: '#555', margin: 0 }}>
                        To access this page you need to log in or create an account.
                    </p>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                        <button className="cancel-btn" style={{ flex: 1 }} onClick={() => { onClose(); navigate('/login'); }}>
                            Log in
                        </button>
                        <button className="save-btn" style={{ flex: 1 }} onClick={() => { onClose(); navigate('/register'); }}>
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AppContent() {
    const location = useLocation();
    const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    // Проверяем залогинен ли пользователь
    const isLoggedIn = !!localStorage.getItem('token');

    const [teams, setTeams] = useState<Team[]>(() => {
        const saved = localStorage.getItem('myTeams');
        return saved ? JSON.parse(saved) : [];
    });

    const saveTeams = (newTeams: Team[]) => {
        setTeams(newTeams);
        localStorage.setItem('myTeams', JSON.stringify(newTeams));
    };

    const isHomePage = location.pathname === '/';

    // Если не залогинен и нажал + — показываем модалку входа
    const handleCreateTeam = () => {
        if (!isLoggedIn) {
            setIsAuthModalOpen(true);
        } else {
            setIsCreateTeamOpen(true);
        }
    };

    // Если не залогинен и нажал profile — показываем модалку входа
    const handleProfile = () => {
        if (!isLoggedIn) {
            setIsAuthModalOpen(true);
        }
    };

    return (
        <>
            <Header
                onCreateTeam={isHomePage ? handleCreateTeam : undefined}
                onProfile={handleProfile}
                isLoggedIn={isLoggedIn}
            />
            <div style={{ paddingTop: '60px' }}>
                <Routes>
                    <Route path="/" element={<HomePage teams={teams} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={
                        isLoggedIn
                            ? <Profile teams={teams} onTeamsChange={saveTeams} />
                            : <HomePage teams={teams} />
                    } />
                </Routes>
            </div>

            {isCreateTeamOpen && (
                <CreateTeamModal
                    onClose={() => setIsCreateTeamOpen(false)}
                    onSave={(team) => {
                        const newTeams = [...teams, { ...team, id: Date.now() }];
                        saveTeams(newTeams);
                        setIsCreateTeamOpen(false);
                    }}
                />
            )}

            {isAuthModalOpen && (
                <NeedAuthModal onClose={() => setIsAuthModalOpen(false)} />
            )}
        </>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
import React, { useState }from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm';
import TodoHome from './components/TodoHome'

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const handleLogin = (username) => {
        setIsLoggedIn(true);
        setUsername(username);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
    };

    const appStyle = {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        boxSizing: 'border-box',
    };

    return (
        <Router>
            <div style={appStyle}>
                <Header />
                <Routes>
                    <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                    <Route path="/signup" element={<SignUpForm />} />
                    <Route
                        path="/home"
                        element={
                            isLoggedIn ? (
                                <TodoHome onLogout={handleLogout} username={username} />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
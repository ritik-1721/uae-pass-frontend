import React, { useState, useEffect } from 'react';
import { login, verifyToken,handleCallback, logout } from './api';

const App = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const code = params.get('code');
                if (code) {
                    await handleCallback(code);
                    const data = await verifyToken();
                    setUser(data.user);
                } else {
                    const data = await verifyToken();
                    setUser(data.user);
                }
                // const params = new URLSearchParams(window.location.search);
                // const token = params.get('token');
                // if (token) {
                //     localStorage.setItem('jwtToken', token);
                //     window.history.replaceState(null, null, window.location.pathname);
                // }
                // const data = await verifyToken();
                // setUser(data.user);
            } catch (err) {
                setError('Authentication failed. Please login again.');
                console.error(err);
            }
        };

        checkToken();
    }, []);

    const handleLogin = async () => {
        try {
            await login();
        } catch (err) {
            setError('Login failed');
            console.error(err);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            setUser(null);
        } catch (err) {
            setError('Logout failed');
            console.error(err);
        }
    };

    return (
        <div>
            <h1>UAE Pass Authentication</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!user ? (
                <button onClick={handleLogin}>Login with UAE Pass</button>
            ) : (
                <div>
                    <h2>Welcome, {user.name}</h2>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
};

export default App;

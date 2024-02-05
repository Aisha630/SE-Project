import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const { login, loading, error } = useLogin();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(password, username);
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
        }
    }
    return (
        <form className="lgoin-form" onSubmit={handleSubmit}>
            <h2>Log In</h2>
            <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button disabled={loading} type="submit">Log In</button>
            {error && <p>{error}</p>}
        </form>
    )
}

export default Login;
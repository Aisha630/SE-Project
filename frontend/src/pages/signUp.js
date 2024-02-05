import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const { signup, loading, error } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(email, password, username);
    }

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
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
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
            <button disabled={loading} type="submit">Sign Up</button>
            {error && <p>{error}</p>}
        </form>
    )
}

export default SignUp;
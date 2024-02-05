import { useState } from 'react';
import { useAuth } from './useAuth';


export const useLogin = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const { dispatch } = useAuth();

    const login = async (password, username) => {
        setLoading(true);
        setError(null);

        const res = await fetch('http://localhost:5003/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password, username }),
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('user', JSON.stringify(data));
            dispatch({ type: 'LOGIN', payload: data });
        } else {
            setError(data.error);
        }
        setLoading(false);
    }
    return { login, loading, error }
}
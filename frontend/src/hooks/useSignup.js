import { useState } from 'react';
import { useAuth} from './useAuth';
// import useAuthStore from '../context/authStore';

export const useSignup = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const { dispatch } = useAuth();
    // const { user, setUser, clearUser } = useAuthStore();

    const signup = async (email, password, username) => {
        setLoading(true);
        setError(null);

        const res = await fetch('http://localhost:5003/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, username }),
        });

        const data = await res.json();
        console.log(data);

        if (res.ok) {
            localStorage.setItem('user', JSON.stringify(data));
            dispatch({ type: 'LOGIN', payload: data });
            // setUser(data);
            setLoading(false);
        } else {
            setLoading(false);
            setError(data.error);
        }
    }
    return {signup, loading, error}
}
import { useState } from 'react';
// import { useAuth} from './useAuth';
// import useAuthStore from '../context/authStore';
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../stores/authSlice'


export const useLogin = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    // const { dispatch } = useAuth();
    // const { user, setUser, clearUser } = useAuthStore();
    const dispatch = useDispatch();
    // const user = useSelector((state) => state.auth.user);

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
        console.log("login data",   data);

        if (res.ok) {
            const j = JSON.stringify(data);
            console.log("login data stringified ",   j);
            // localStorage.setItem('user', JSON.stringify(data));
            // dispatch({ type: 'LOGIN', payload: data });
            // setUser(data);
            // setUser(data.username, data.token);
            dispatch(login(data.username, data.token));
        } else {
            setError(data.error);
        }
        setLoading(false);
    }
    return {login, loading, error}
}
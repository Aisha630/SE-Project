import { useAuth } from './useAuth.js';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


export const useLogout = () => {
    const { dispatch } = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        try {
            console.log('Logging out...');
            localStorage.removeItem('user');
            localStorage.removeItem('persist:root')
            Cookies.remove("cart")

            dispatch({ type: 'LOGOUT' });
            navigate('/login');

        } catch (error) {
            console.error('Logout Error: ', error);
        }
    }
    return { logout }
}
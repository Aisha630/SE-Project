import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

// Custom hook to use the AuthContext
const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export { useAuth };
import React from 'react';
import { useSelector } from 'react-redux';

import { useLogout} from '../hooks/useLogout';

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>Welcome, {user ? user : 'Guest'}!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;


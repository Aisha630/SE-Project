import { useAuth } from '../hooks/useAuth';

const Home = () => {
    const { state } = useAuth();
    const username ='Guest';
    // const username = state.user?.username || 'Guest';
    console.log('Home state:', state);

    return (
        <div>
            <h1>Home</h1>
            <p>Welcome {username}</p>
        </div>
    );
}

export default Home;
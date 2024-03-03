import './css/App.css';
import Login from './pages/login';
import SignUp from './pages/signUp';
import Home from './pages/home';
import PostAd from './pages/PostAd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import "@fontsource/poppins";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({

  palette: {
    background: {
      default: '#58a75b'
    },
    primary: {
      main: '#58a75b',

    },
    secondary: {
      main: '#ffffff',
      opacity: 0.7,
    },
  },
  typography: {
    fontFamily: [
      'Poppins', // Replace with your font name
      'Arial',
      'sans-serif'
    ].join(','),
  },
});

function App() {

  return (
    <ThemeProvider theme={theme} >
      <ToastContainer position="top-center" autoClose={2000} toastStyle={{
        backgroundColor: "white",
        color: "black",
      }} />
      <CssBaseline />
      <AuthProvider>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/PostAd" element={<PostAd />} />
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

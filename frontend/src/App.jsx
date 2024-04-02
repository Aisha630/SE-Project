import './css/App.css';
import Login from './pages/login';
import SignUp from './pages/signUp';
import Home from './pages/home';
import PostAd from './pages/PostAd';
import ShopItems from './pages/shop';
import ErrorPage from './pages/errorpage';
import ProductDetails from './pages/productDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import "@fontsource/poppins";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './context/cartContext';
import OrderSummaryPage from './pages/orderSummary';
import UserProfile from './pages/userProfile';
const theme = createTheme({
  palette: {
    background: {
      default: 'rgb(243, 244, 246)'
    },
    primary: {
      main: 'rgb(243, 244, 246)',
    },
  },
  typography: {
    fontFamily: [
      'Poppins',
      'Arial',
      'sans-serif'
    ].join(','),
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />
      <ToastContainer position="top-center" autoClose={2000} toastStyle={{
        backgroundColor: "white",
        color: "black",
      }} />
      <AuthProvider>
      <CartProvider>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/sell" element={<PostAd />} />
              <Route path="/shop" element={<ShopItems mode={"sale"}/>} />
              <Route path="/auction" element={<ShopItems mode={"auction"}/>} />
              <Route path="/donation" element={<ShopItems mode={"donate"}/>} />
              <Route path="/shop/:id" element={<ProductDetails />} />
              <Route path="/checkout" element={<OrderSummaryPage/>} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="*" element={<ErrorPage />} />

            </Routes>
          </BrowserRouter>
        </div>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

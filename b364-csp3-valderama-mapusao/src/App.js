import './App.css';
import AppNavbar from './components/AppNavbar';
// import Banner from './components/Banner';
// import Highlights from './components/Highlights';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductView from './pages/ProductView';
import AddProduct from './pages/AddProduct';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/Error';
import Profile from './pages/Profile';
import Cart from './components/Cart';
import { Container, Spinner } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserProvider } from './UserContext';
import { CartProvider } from './CartContext';

function App() {

  const [user, setUser] = useState({
      id: null,
      isAdmin: null
  })

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function for clearing localStorage on logout
  const unsetUser = () => {
    localStorage.clear();
  }

  // Used to check if the user information is properly stored upon login and the localStorage information is cleared upon logout
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch('http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b2/users/details', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch user information');
      }
      return res.json();
    })
    .then(data => {
      console.log(data);
      if (typeof data.user !== "undefined") {
        setUser({
          id: data.user._id,
          isAdmin: data.user.isAdmin
        });
      } else {
        setUser({
          id: null,
          isAdmin: null
        });
      }
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      setError('Failed to fetch user information. Please try again later.');
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
    <CartProvider>
        <Router>
          <Container fluid>
            <AppNavbar/>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/products" element={<Products/>} />
              <Route path="/products/:productId" element={<ProductView/>} />
              <Route path="/addProduct" element={<AddProduct/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/logout" element={<Logout/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/user-cart" element={<Cart/>} />
              <Route path="*" element={<Error/>} />
            </Routes>
          </Container>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;

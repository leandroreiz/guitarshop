import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from '../common/components/Header';
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';
import Footer from '../common/components/Footer';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="cart" element={<CartPage />}>
              <Route path=":id" element={<CartPage />} />
            </Route>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

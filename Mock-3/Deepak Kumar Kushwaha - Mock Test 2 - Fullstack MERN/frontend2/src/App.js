import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import LoginForm from './components/LoginForm';
import UserStatus from './components/UserStatus';
import UserDetails from './components/UserDetails';
import FormikLogin from './components/FormikLogin';
import withWindowWidth from './components/withWindowWidth';

const Responsive = withWindowWidth(({ windowWidth }) => (
  <div>Window width: {windowWidth}px</div>
));

export default function App(){
  const sampleProduct = { title: 'Sneakers', price: 120, discount: 20 };
  return (
    <div style={{ padding: 20 }}>
      <h1>ShopNow</h1>
      <nav>
        <Link to="/">Home</Link> 
        | <Link to="/login">Login</Link> 
        | <Link to="/formik">Formik</Link>
      </nav>
      <Routes>
        <Route path="/" element={
          <div>
            <ProductCard {...sampleProduct} />
            <UserStatus userId={42} />
            <Responsive />
          </div>
        } />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/formik" element={<FormikLogin />} />
      </Routes>
    </div>
  );
}

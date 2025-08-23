import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ChatAssistant } from './components/ai/ChatAssistant';
import { HomePage } from './pages/HomePage';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/live-animals" element={<div className="container mx-auto px-4 py-16"><h1 className="text-3xl font-bold">Live Animals - Coming Soon</h1></div>} />
                <Route path="/cut-meat" element={<div className="container mx-auto px-4 py-16"><h1 className="text-3xl font-bold">Cut Meat - Coming Soon</h1></div>} />
                <Route path="/sellers" element={<div className="container mx-auto px-4 py-16"><h1 className="text-3xl font-bold">Sellers - Coming Soon</h1></div>} />
                <Route path="/cart" element={<div className="container mx-auto px-4 py-16"><h1 className="text-3xl font-bold">Shopping Cart - Coming Soon</h1></div>} />
                <Route path="/profile" element={<div className="container mx-auto px-4 py-16"><h1 className="text-3xl font-bold">Profile - Coming Soon</h1></div>} />
                <Route path="/orders" element={<div className="container mx-auto px-4 py-16"><h1 className="text-3xl font-bold">Orders - Coming Soon</h1></div>} />
                <Route path="/dashboard" element={<div className="container mx-auto px-4 py-16"><h1 className="text-3xl font-bold">Seller Dashboard - Coming Soon</h1></div>} />
              </Routes>
            </main>
            <Footer />
            <ChatAssistant />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
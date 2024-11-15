import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductListPage from './components/ProductListPage';
import ProductCreationPage from './components/ProductCreationPage';
import ProductDetailPage from './components/ProductDetailPage';
import ProductEditPage from './components/ProductEditPage';
import { ToastContainer } from 'react-toastify';  // Import toast notifications
import 'react-toastify/dist/ReactToastify.css';    // Import Toast styling

const App = () => {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Car Management System</h1>
        </header>
        <main>
          <Routes>
            {/* Routes for each page */}
            <Route path="/" element={<ProductListPage />} />
            <Route path="/cars/create" element={<ProductCreationPage />} />
            <Route path="/cars/:id" element={<ProductDetailPage />} />
            <Route path="/cars/edit/:id" element={<ProductEditPage />} />
          </Routes>
        </main>
        <ToastContainer /> {/* Toast notifications will show up here */}
      </div>
    </Router>
  );
};

export default App;


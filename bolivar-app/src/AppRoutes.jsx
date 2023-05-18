import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/NavigationBar';
import FormClients from './components/FormClients';
import Productos from './components/Productos';
const AppRoutes = () => {
    return (
      <Routes>
        {/*/ControlWeb*/ }
        <Route path="/ControlWeb" element={<Navbar />} />
        <Route path="/ControlWeb/FormClients" element={<FormClients />} />
        <Route path="/ControlWeb/ProductForm" element={<Productos />} />

      </Routes>
    );
  };
  
  export default AppRoutes;
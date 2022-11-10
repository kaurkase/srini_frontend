import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './views/LoginPage';
import EditClient from './views/EditClient';
import ClientsList from './views/ClientsList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route index element={<ClientsList />} />
          <Route path="clients" element={<ClientsList />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="client" element={<EditClient />} />
        </Routes>
      </BrowserRouter>
  //</React.StrictMode>
);

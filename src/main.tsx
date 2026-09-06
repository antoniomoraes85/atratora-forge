import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRoutes } from './app/routes/AppRoutes';
import './styles/global.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Falha ao localizar o elemento raiz #root para montar a aplicação.');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);

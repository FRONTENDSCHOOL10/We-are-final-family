import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/main.css';
import App from '/App';

const domNode = document.getElementById('react-app');

createRoot(domNode).render(
  <StrictMode>
    <App />
  </StrictMode>
);

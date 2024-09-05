import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/main.css';
import App from './App';

const domNode = document.getElementById('react-app');

if (!domNode) {
  throw new Error('문서에 "#root" 요소가 존재하지 않습니다.');
}

createRoot(domNode).render(
  <StrictMode>
    <App />
  </StrictMode>
);

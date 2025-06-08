import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// MSW dev 환경에서만 실행
if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser.ts');
  worker.start();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

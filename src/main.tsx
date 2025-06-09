import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

async function prepareMockWorker() {
  // MSW dev 환경에서만 실행
  if (import.meta.env.MODE === 'development' || import.meta.env.VITE_USE_MSW === 'true') {
    const { worker } = await import('./mocks/browser');
    await worker.start();

    // MSW 활성화 로그 출력
    console.log('%c[MSW] Mock Service Worker is running.', 'color: green; font-weight: bold;');
  }
}

prepareMockWorker();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

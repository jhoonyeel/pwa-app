import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const isMSW = import.meta.env.MODE === 'development' || import.meta.env.VITE_USE_MSW === 'true';
async function prepareMockWorker() {
  // MSW dev 환경에서만 실행
  if (isMSW) {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledRequest: isMSW
        ? (req, print) => {
            if (req.url.includes('manifest.webmanifest')) return; // 무시 (intercept 하지 않음)
            print.warning(); // 그 외는 콘솔 경고 출력
          }
        : 'bypass',
    });

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

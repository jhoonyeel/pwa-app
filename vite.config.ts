import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['@emotion'],
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'pwa-app',
        short_name: 'pwa',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#317EFB',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      reporter: ['text', 'html'], // ✅ 커버리지 리포트 형식
      provider: 'v8', // ✅ 커버리지 측정 도구
      reportsDirectory: './coverage', // ✅ 결과 저장 위치
      all: true, // 프로젝트 전체 커버리지 측정 (안 쓰면 실행된 파일만 측정)
      include: ['src/**/*.{ts,tsx}'], // ✅ 커버리지 측정 대상
      exclude: [
        // 타입 선언 관련
        'src/**/*.d.ts',

        // 부트스트랩/환경 파일
        'src/main.tsx',
        'src/setupTests.ts',

        // 테스트 파일
        'src/**/*.test.{ts,tsx}',
      ], // ✅ 제외 대상
    },
  },
});

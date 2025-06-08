// src/setupTests.ts
import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll, beforeEach } from 'vitest';
import { server } from './mocks/server';

// 테스트 시작 전에 서버 시작
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));

// 각 테스트 케이스 전에 핸들러 초기화
beforeEach(async () => {
  await fetch('/pet/reset', { method: 'POST' });
});

// 테스트 케이스 간 핸들러 초기화 (중복 방지)
afterEach(() => server.resetHandlers());

// 테스트 끝나면 서버 종료
afterAll(() => server.close());

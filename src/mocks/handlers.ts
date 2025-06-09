// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import type { PetInfo } from '../types';

const isDev = import.meta.env.DEV || import.meta.env.VITE_USE_MSW === 'true';
const petData: PetInfo[] = [];

const devHandlers = [
  // POST /pet
  http.post('/pet', async ({ request }) => {
    const data = (await request.json()) as PetInfo; // 타입 단언 추가!
    petData.push(data);
    console.log('POST /pet', data);

    return HttpResponse.json({}, { status: 201 });
  }),

  // GET /pet
  http.get('/pet', () => {
    const latestData = petData[petData.length - 1]; // 마지막 값
    console.log('GET /pet', latestData);

    if (latestData) {
      return HttpResponse.json(latestData, { status: 200 });
    } else {
      return HttpResponse.json({ message: 'No data' }, { status: 404 });
    }
  }),

  // (Optional) 초기화 API (테스트 용도로 쓸 때 유용)
  http.post('/pet/reset', () => {
    petData.length = 0;
    console.log('POST /pet/reset → 초기화');
    return HttpResponse.json({}, { status: 200 });
  }),
];

const prodHandlers = [
  http.post('*/pet', async ({ request }) => {
    const data = (await request.json()) as PetInfo;
    petData.push(data);
    return HttpResponse.json({}, { status: 201 });
  }),

  http.get('*/pet', () => {
    const latestData = petData[petData.length - 1];
    if (latestData) {
      return HttpResponse.json(latestData, { status: 200 });
    } else {
      return HttpResponse.json({ message: 'No data' }, { status: 404 });
    }
  }),

  http.post('*/pet/reset', () => {
    petData.length = 0;
    return HttpResponse.json({}, { status: 200 });
  }),
];

export const handlers = isDev ? devHandlers : prodHandlers;

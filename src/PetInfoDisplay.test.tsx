// src/PetInfoDisplay.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import PetInfoDisplay from './PetInfoDisplay';

// 💡 fetch 사용 가능 (테스트 환경에서도!)
const mockPetInfo = {
  name: '초코',
  type: '고양이',
  gender: '여아',
  birth: '2020-01-01',
};

describe('PetInfoDisplay', () => {
  test('서버에서 데이터를 받아 화면에 표시한다', async () => {
    // 1️⃣ 먼저 POST로 데이터 등록
    await fetch('/pet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockPetInfo),
    });

    // 2️⃣ 컴포넌트 렌더링 → 내부에서 GET 호출
    render(<PetInfoDisplay />);

    // 3️⃣ 화면에 데이터 나타나는지 확인
    await waitFor(() => {
      expect(screen.getByText('반려동물 정보')).toBeInTheDocument();
      expect(screen.getByText('초코')).toBeInTheDocument();
      expect(screen.getByText('고양이')).toBeInTheDocument();
      expect(screen.getByText('여아')).toBeInTheDocument();
      expect(screen.getByText('2020-01-01')).toBeInTheDocument();
    });
  });
});

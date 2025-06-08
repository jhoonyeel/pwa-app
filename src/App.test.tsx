// src/App.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import App from './App';

describe('App', () => {
  test('초기에 "반려동물 정보 입력" 제목이 보여야 한다', () => {
    render(<App />);

    // 화면에 '반려동물 정보 입력'이 보이는지 확인
    expect(screen.getByText('반려동물 정보 입력')).toBeInTheDocument();
  });

  test('폼 입력 후 제출하면 결과 화면에 값이 보인다', async () => {
    render(<App />);

    const user = userEvent.setup();

    // 이름 입력
    const nameInput = screen.getByLabelText('반려동물 이름');
    await user.type(nameInput, '초코');

    // 종류 선택
    const typeSelect = screen.getByLabelText('반려동물 종류');
    await user.selectOptions(typeSelect, '고양이');

    // 성별 선택
    const genderSelect = screen.getByLabelText('반려동물 성별');
    await user.selectOptions(genderSelect, '여아');

    // 생일 입력
    const birthInput = screen.getByLabelText('반려동물 생일');
    await user.type(birthInput, '2020-01-01');

    // 제출 버튼 클릭
    const submitButton = screen.getByRole('button', { name: '제출' });
    await user.click(submitButton);

    // 결과 화면 확인 (GET 요청 이후 업데이트 되므로 waitFor 사용)
    await waitFor(() => {
      expect(screen.getByText('반려동물 정보')).toBeInTheDocument();
      expect(screen.getByText('초코')).toBeInTheDocument();
      expect(screen.getByText('고양이')).toBeInTheDocument();
      expect(screen.getByText('여아')).toBeInTheDocument();
      expect(screen.getByText('2020-01-01')).toBeInTheDocument();
    });
  });
});

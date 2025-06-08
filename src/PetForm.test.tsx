// src/PetForm.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, test, vi } from 'vitest';
import PetForm from './PetForm';
import type { PetInfo } from './types';

describe('PetForm', () => {
  const initialPetInfo: PetInfo = {
    name: '',
    type: '강아지',
    gender: '남아',
    birth: '',
  };

  // Wrapper 컴포넌트
  const Wrapper = ({ onSubmit }: { onSubmit: () => void }) => {
    const [petInfo, setPetInfo] = useState<PetInfo>(initialPetInfo);
    return <PetForm petInfo={petInfo} setPetInfo={setPetInfo} onSubmit={onSubmit} />;
  };

  test('이름 입력 필드에 값 입력 시 반영된다', async () => {
    const mockOnSubmit = vi.fn();

    render(<Wrapper onSubmit={mockOnSubmit} />);

    const user = userEvent.setup();

    const nameInput = screen.getByLabelText('반려동물 이름');
    await user.type(nameInput, '초코');

    // 입력 후 value가 반영되었는지 확인
    expect(nameInput).toHaveValue('초코');
  });

  test('제출 버튼 클릭 시 onSubmit이 호출된다', async () => {
    const mockOnSubmit = vi.fn();

    render(<Wrapper onSubmit={mockOnSubmit} />);

    const user = userEvent.setup();

    // 필수 입력값 입력
    const nameInput = screen.getByLabelText('반려동물 이름');
    await user.type(nameInput, '초코');

    const typeSelect = screen.getByLabelText('반려동물 종류');
    await user.selectOptions(typeSelect, '고양이');

    const genderSelect = screen.getByLabelText('반려동물 성별');
    await user.selectOptions(genderSelect, '여아');

    const birthInput = screen.getByLabelText('반려동물 생일');
    await user.type(birthInput, '2020-01-01');

    // 제출 버튼 클릭
    const submitButton = screen.getByRole('button', { name: '제출' });
    await user.click(submitButton);

    // onSubmit 호출 여부 확인
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});

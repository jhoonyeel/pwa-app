// src/PetInfoDisplay.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import PetInfoDisplay from './PetInfoDisplay';
import type { PetInfo } from './types';

describe('PetInfoDisplay', () => {
  const mockPetInfo: PetInfo = {
    name: '초코',
    type: '고양이',
    gender: '여아',
    birth: '2020-01-01',
  };

  test('전달된 반려동물 정보가 화면에 표시된다', () => {
    render(<PetInfoDisplay petInfo={mockPetInfo} />);

    expect(screen.getByText('반려동물 정보')).toBeInTheDocument();
    expect(screen.getByText('초코')).toBeInTheDocument();
    expect(screen.getByText('고양이')).toBeInTheDocument();
    expect(screen.getByText('여아')).toBeInTheDocument();
    expect(screen.getByText('2020-01-01')).toBeInTheDocument();
  });
});

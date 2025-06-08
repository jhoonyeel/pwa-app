import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import type { PetInfo } from './types';

const PetInfoDisplay = () => {
  const [petInfo, setPetInfo] = useState<PetInfo | null>(null);

  useEffect(() => {
    const fetchPetInfo = async () => {
      const res = await fetch('/pet');
      if (res.ok) {
        const data = (await res.json()) as PetInfo;
        setPetInfo(data);
      } else {
        console.error('Failed to fetch pet info');
      }
    };

    fetchPetInfo();
  }, []);

  if (!petInfo) {
    return <p>로딩 중...</p>;
  }

  return (
    <Wrapper>
      <h2>반려동물 정보</h2>
      <p>
        <strong>이름:</strong> {petInfo.name}
      </p>
      <p>
        <strong>종류:</strong> {petInfo.type}
      </p>
      <p>
        <strong>성별:</strong> {petInfo.gender}
      </p>
      <p>
        <strong>생일:</strong> {petInfo.birth}
      </p>
    </Wrapper>
  );
};

export default PetInfoDisplay;

const Wrapper = styled.div`
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
`;

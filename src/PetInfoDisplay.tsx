import styled from '@emotion/styled';
import type { PetInfo } from './types';

type PetInfoDisplayProps = {
  petInfo: PetInfo;
};

const PetInfoDisplay = ({ petInfo }: PetInfoDisplayProps) => {
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

import styled from '@emotion/styled';
import { useState } from 'react';
import PetForm from './PetForm';
import PetInfoDisplay from './PetInfoDisplay';
import type { PetInfo } from './types';

const INITIAL_PET_INFO: PetInfo = {
  name: '',
  type: '강아지',
  gender: '남아',
  birth: '',
};

const App = () => {
  const [petInfo, setPetInfo] = useState<PetInfo>(INITIAL_PET_INFO);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <Container>
      {submitted ? (
        <PetInfoDisplay petInfo={petInfo} />
      ) : (
        <PetForm petInfo={petInfo} setPetInfo={setPetInfo} onSubmit={handleSubmit} />
      )}
    </Container>
  );
};

export default App;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

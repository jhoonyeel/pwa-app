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

  const handleSubmit = async () => {
    // 1️⃣ POST /pet 요청
    await fetch('/pet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(petInfo),
    });

    // 2️⃣ submitted 상태 변경
    setSubmitted(true);
  };

  return (
    <Container>
      {submitted ? (
        <PetInfoDisplay />
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

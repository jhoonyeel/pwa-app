import styled from '@emotion/styled';
import type { PetInfo } from './types';

type PetFormProps = {
  petInfo: PetInfo;
  setPetInfo: React.Dispatch<React.SetStateAction<PetInfo>>;
  onSubmit: () => void;
};

const TYPE_OPTIONS = ['강아지', '고양이', '햄스터', '조류', '어류', '파충류'];
const GENDER_OPTIONS = ['남아', '여아', '중성'];

const PetForm = ({ petInfo, setPetInfo, onSubmit }: PetFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Wrapper onSubmit={handleSubmit}>
      <h2>반려동물 정보 입력</h2>

      <FormGroup>
        <Label htmlFor="pet-name">반려동물 이름</Label>
        <Input
          id="pet-name"
          type="text"
          value={petInfo.name}
          maxLength={20}
          onChange={(e) => setPetInfo({ ...petInfo, name: e.target.value })}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="pet-type">반려동물 종류</Label>
        <Select
          id="pet-type"
          value={petInfo.type}
          onChange={(e) => setPetInfo({ ...petInfo, type: e.target.value })}
        >
          {TYPE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="pet-gender">반려동물 성별</Label>
        <Select
          id="pet-gender"
          value={petInfo.gender}
          onChange={(e) => setPetInfo({ ...petInfo, gender: e.target.value })}
        >
          {GENDER_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="pet-birth">반려동물 생일</Label>
        <Input
          id="pet-birth"
          type="date"
          value={petInfo.birth}
          onChange={(e) => setPetInfo({ ...petInfo, birth: e.target.value })}
          required
        />
      </FormGroup>

      <Button type="submit">제출</Button>
    </Wrapper>
  );
};

export default PetForm;

const Wrapper = styled.form`
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

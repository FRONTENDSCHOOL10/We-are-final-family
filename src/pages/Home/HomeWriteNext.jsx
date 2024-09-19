import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/App/Header';
import Button from '@/components/Button/Button';
import ButtonSelector from '@/components/WriteForm/ButtonSelector/ButtonSelector';
import { GenderData } from '@/components/WriteForm/ButtonSelector/data/GenderData';
import { AgeData } from '@/components/WriteForm/ButtonSelector/data/AgeDate';
import S from './HomeWriteNext.module.css';

function HomeWriteNext() {
  const navigate = useNavigate();
  const [gender, setGender] = useState('누구나');
  const [age, setAge] = useState('누구나');
  const [isGenderPublic, setIsGenderPublic] = useState(false);
  const [isAgePublic, setIsAgePublic] = useState(false);

  const handleSubmit = () => {
    console.log('파티원 모집:', { gender, age, isGenderPublic, isAgePublic });
    navigate('/home');
  };

  return (
    <>
      <Header back={true} />
      <main className={S.homeWrite}>
        <div className={S.writeWrap}>
          <h2>어떤 파티원과 함께 할까요?</h2>
          <div className="imgBox"></div>

          <ul>
            <li>
              <ButtonSelector
                data={GenderData}
                label="성별"
                title="on"
                // toggle="on"
                // toggleName="전체 공개"
                btnValue={gender}
                onChange={setGender}
                onToggleChange={setIsGenderPublic}
                isToggleOn={isGenderPublic}
              />
            </li>
            <li>
              <ButtonSelector
                data={AgeData}
                label="연령"
                title="on"
                // toggle="on"
                // toggleName="전체 공개"
                btnValue={age}
                onChange={setAge}
                onToggleChange={setIsAgePublic}
                isToggleOn={isAgePublic}
              />
            </li>
          </ul>
        </div>
        <footer>
          <Button color="black" onClick={handleSubmit}>
            파티원 모집
          </Button>
        </footer>
      </main>
    </>
  );
}

export default HomeWriteNext;

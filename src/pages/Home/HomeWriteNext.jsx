import { useNavigate } from 'react-router-dom';
import Header from '@/components/App/Header';
import Button from '@/components/Button/Button';
import ButtonSelector from '@/components/WriteForm/ButtonSelector/ButtonSelector';
import { GenderData } from '@/components/WriteForm/ButtonSelector/data/GenderData';
import { AgeData } from '@/components/WriteForm/ButtonSelector/data/AgeDate';
import S from './HomeWriteNext.module.css';
import useHomeWriteStore from '@/stores/homeWriteStore';

function HomeWriteNext() {
  const navigate = useNavigate();
  const { gender, age, setGender, setAge } = useHomeWriteStore();

  const handleSubmit = () => {
    console.log('파티원 모집:', { gender, age });
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
                btnValue={gender}
                onChange={setGender}
              />
            </li>
            <li>
              <ButtonSelector
                data={AgeData}
                label="연령"
                btnValue={age}
                onChange={setAge}
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

import { useNavigate } from 'react-router-dom';
import S from './HomeWrite.module.css';
import Header from '@/components/App/Header';
import Button from '@/components/Button/Button';
import ListSelect from './../../components/ListSelect/ListSelect';
import PersonnelCounter from '@/components/WriteForm/PersonnelCounter/PersonnelCounter';
import DateSelector from './../../components/WriteForm/DateSelector/DateSelector';
import TimeSelector from './../../components/WriteForm/TimeSelector/TimeSelector';
import LocationButton from './../../components/WriteForm/LocationButton/LocationButton';

function HomeWrite() {
  const navigate = useNavigate();

  const handlePictureClick = () => {
    console.log('이미지 업로드 버튼 클릭');
  };

  const handleNextClick = () => {
    navigate('/home/writenext');
  };

  return (
    <>
      <Header
        back={true}
        actions={[{ icon: 'i_picture_line', onClick: handlePictureClick }]}
      />
      <main className={S.homeWrite}>
        <div className={S.writeWrap}>
          <div role="group" className={S.inputTitle}>
            <label htmlFor="" className="sr-only">
              글 제목 입력
            </label>
            <input
              type="text"
              className="hdg-lg"
              placeholder="글 제목을 입력해주세요."
            />
          </div>

          <ListSelect title="관심분야를 선택해주세요." type="A" />
          <ListSelect title="카테고리를 선택해주세요." type="B" />
          <textarea
            name=""
            id=""
            placeholder="활동 내용을 입력해주세요."
            className="para-md"
          ></textarea>
          <div className="imgBox"></div>

          <PersonnelCounter label="인원" />
          <DateSelector label="날짜" />
          <TimeSelector label="시간" />
          <LocationButton label="장소" />
        </div>
        <footer>
          <Button color="black" onClick={handleNextClick}>
            다음
          </Button>
        </footer>
      </main>
    </>
  );
}

export default HomeWrite;

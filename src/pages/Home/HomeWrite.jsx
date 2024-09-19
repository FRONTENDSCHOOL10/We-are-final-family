import { useNavigate } from 'react-router-dom';
import S from './HomeWrite.module.css';
import Header from '@/components/App/Header';
import Button from '@/components/Button/Button';
import ListSelect from '@/components/ListSelect/ListSelect';
import PersonnelCounter from '@/components/WriteForm/PersonnelCounter/PersonnelCounter';
import DateSelector from '@/components/WriteForm/DateSelector/DateSelector';
import TimeSelector from '@/components/WriteForm/TimeSelector/TimeSelector';
import LocationButton from '@/components/WriteForm/LocationButton/LocationButton';
import useHomeWriteStore from '@/stores/homeWriteStore';
import { toKoreanTime, fromKoreanTime } from '@/utils/formatDate';

function HomeWrite() {
  const navigate = useNavigate();
  const {
    title,
    interest,
    category,
    description,
    personnel,
    date,
    time,
    location,
    setTitle,
    setInterest,
    setCategory,
    setDescription,
    setPersonnel,
    setDate,
    setTime,
    setLocation,
  } = useHomeWriteStore();

  const handlePictureClick = () => {
    console.log('이미지 업로드 버튼 클릭');
  };

  const handleNextClick = () => {
    // 여기서 로컬 스토리지 저장은 Zustand의 persist 미들웨어가 자동으로 처리합니다.
    navigate('/home/writenext');
  };
  const dateValue =
    typeof date === 'string'
      ? toKoreanTime(new Date(date))
      : toKoreanTime(date || new Date());

  return (
    <>
      <Header
        back={true}
        actions={[{ icon: 'i_picture_line', onClick: handlePictureClick }]}
      />
      <main className={S.homeWrite}>
        <div className={S.writeWrap}>
          <div role="group" className={S.inputTitle}>
            <label htmlFor="title" className="sr-only">
              글 제목 입력
            </label>
            <input
              id="title"
              type="text"
              className="hdg-lg"
              placeholder="글 제목을 입력해주세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <ListSelect
            title="관심분야를 선택해주세요."
            type="A"
            value={interest}
            onChange={setInterest}
          />
          <ListSelect
            title="카테고리를 선택해주세요."
            type="B"
            value={category}
            onChange={setCategory}
          />
          <textarea
            id="description" // id를 "content"에서 "description"으로 변경
            placeholder="활동 내용을 입력해주세요."
            className="para-md"
            value={description} // content를 description으로 변경
            onChange={(e) => setDescription(e.target.value)} // setContent를 setDescription으로 변경
          ></textarea>
          <div className="imgBox"></div>

          <PersonnelCounter
            label="인원"
            value={personnel}
            onChange={setPersonnel}
          />
          <DateSelector
            label="날짜"
            value={dateValue}
            onChange={(newDate) => {
              const utcDate = fromKoreanTime(newDate);
              setDate(utcDate.toISOString());
            }}
          />
          <TimeSelector label="시간" value={time} onChange={setTime} />
          <LocationButton
            label="장소"
            value={location}
            onChange={setLocation}
          />
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

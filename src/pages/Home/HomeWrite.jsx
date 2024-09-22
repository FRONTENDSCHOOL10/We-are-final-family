import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
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
  const fileInputRef = useRef(null);
  const {
    title,
    interest,
    category,
    description,
    personnel,
    date,
    time,
    location,
    image,
    setTitle,
    setInterest,
    setCategory,
    setDescription,
    setPersonnel,
    setDate,
    setTime,
    setLocation,
    setImage,
    isFormValid,
  } = useHomeWriteStore();

  const handlePictureClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleNextClick = () => {
    // 여기서 로컬 스토리지 저장은 Zustand의 persist 미들웨어가 자동으로 처리합니다.
    navigate('/home/write/2');
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
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="image/*"
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

          {image && (
            <div className={S.imagePreview}>
              <img src={image} alt="업로드된 이미지" />
              <button className={S.removeImageBtn} onClick={handleRemoveImage}>
                <span className="i_close" />
              </button>
            </div>
          )}

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
          <Button
            color="black"
            onClick={handleNextClick}
            disabled={!isFormValid()}
          >
            다음
          </Button>
        </footer>
      </main>
    </>
  );
}

export default HomeWrite;

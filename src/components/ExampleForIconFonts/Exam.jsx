import S from './Exam.module.css';

function Exam() {
  return (
    <>
      <button className={`${S.button} ${S.light}`}>
        {/* 아이콘 폰트 클래스 */}
        <span className="i_home_line"></span>
        버튼
      </button>
      <button className={`${S.button} ${S.dark}`}>
        {/* 아이콘 폰트 클래스 */}
        <span className="i_direction_top"></span>
        버튼
      </button>
      <button className={`${S.button} ${S.primary}`}>
        {/* 아이콘 폰트 클래스 */}
        <span className="i_board_line"></span>
        버튼
      </button>

      {/* 타이포 클래스 명 */}
      <p className="hdg-sm">타이포그래피 헤딩-sm</p>
      <p className="hdg-md">타이포그래피 헤딩-md</p>
      <p className="hdg-lg">타이포그래피 헤딩-lg</p>
      <p className="hdg-xl">타이포그래피 헤딩-xl</p>
      <p className="hdg-xxl">타이포그래피 헤딩-xxl</p>
      <p className="hdg-xxl">타이포그래피 헤딩-xxxl</p>
      <p className="lbl-sm">타이포그래피 레이블-sm</p>
      <p className="lbl-md">타이포그래피 레이블-md</p>
      <p className="lbl-lg">타이포그래피 레이블-lg</p>
      <p className="lbl-xl">타이포그래피 레이블-xl</p>
      <p className="para-util">타이포그래피 문단-util</p>
      <p className="para-sm">타이포그래피 문단-sm</p>
      <p className="para-md">타이포그래피 문단-md</p>
      <p className="para-lg">타이포그래피 문단-lg</p>
      <p className="para-xl">타이포그래피 문단-xl</p>
    </>
  );
}

export default Exam;

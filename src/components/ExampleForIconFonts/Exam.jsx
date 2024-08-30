import S from './Exam.module.css';

function Exam() {
  return (
    <>
      <button className={`${S.button} ${S.light}`}>
        <span className="icon_home_line"></span>
        버튼
      </button>
      <button className={`${S.button} ${S.dark}`}>
        <span className="icon_home_line"></span>
        버튼
      </button>
      <button className={`${S.button} ${S.primary}`}>
        <span className="icon_home_line"></span>
        버튼
      </button>
    </>
  );
}

export default Exam;

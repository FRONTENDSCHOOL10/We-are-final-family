import S from './SendButton.module.css';
export function SendButton() {
  const handleClick = () => {
    console.log('click');
  };

  return (
    <div>
      <input
        type="button"
        onClick={handleClick}
        id="button"
        className={S.component}
      ></input>
      <label htmlFor="button" className="i_send"></label>
    </div>
  );
}

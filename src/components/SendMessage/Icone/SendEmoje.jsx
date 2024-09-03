// import S from './SendEmoje.module.css';

export function SendEmoje({ onClick }) {
  return (
    <div>
      <span
        className="i_emoji"
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      ></span>
    </div>
  );
}

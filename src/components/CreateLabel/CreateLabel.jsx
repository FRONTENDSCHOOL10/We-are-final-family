import S from './CreateLabel.module.css';

/* eslint-disable react/prop-types */
function CreateLabel({ label = '이름', children }) {
  return (
    <div className={S.con}>
      <span>{label}</span>
      {children}
    </div>
  );
}

export default CreateLabel;

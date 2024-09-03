import S from './AgreeButton.module.css';

export function AgreeButton() {
  return (
    <div className={S.component}>
      <button className={`${S.agree} lbl-sm`}>승인</button>
      <button className={`${S.disagree} lbl-sm`}>거절</button>
    </div>
  );
}

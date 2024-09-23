import { string, any } from 'prop-types';

import S from './ChatSpeechbubble.module.css';

ChatSpeechbubble.propTypes = {
  mychatdata: any,
  yourchatdata: string,
  userId: any,
  time: string,
};
export function ChatSpeechbubble({
  mychatdata = '어쩌구 저쩌구 안녕하세요',
  userId,
  time,
}) {
  return userId ? (
    <div className={S.component}>
      <div className={`${S.time} para-sm`}>{time}</div>{' '}
      <div className={`${S.bubble} para-md`}>{mychatdata}</div>
    </div>
  ) : (
    <div className={`${S.component} ${S.other}`}>
      <div className={`${S.bubble} para-md`}>{mychatdata}</div>
      <div className={`${S.time} para-sm`}>{time}</div>
    </div>
  );
}

import { string, any } from 'prop-types';
import { TimeNow } from '../TimeNow/TimeNow';
import S from './ChatSpeechbubble.module.css';

ChatSpeechbubble.propTypes = {
  mychatdata: string,
  yourchatdata: string,
  userId: any,
};

export function ChatSpeechbubble({
  mychatdata = '어쩌구 저쩌구 안녕하세요',
  yourchatdata = '바보',
  userId,
}) {
  return userId === 2 ? (
    <div className={S.component}>
      <TimeNow /> <div className="para-md">{mychatdata}</div>
    </div>
  ) : (
    <div className={S.component}>
      <div
        style={{ background: 'var(--gray-100)', color: 'var(--black)' }}
        className="para-md"
      >
        {yourchatdata}
      </div>
      <TimeNow />
    </div>
  );
}

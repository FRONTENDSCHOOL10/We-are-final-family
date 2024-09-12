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
  yourchatdata = '바보',
  userId,
  time,
}) {
  return userId ? (
    <div className={S.component}>
      <div
        className="para-sm"
        style={{
          color: 'var(--gray-400)',
          background: 'white',
          padding: '0',
          marginRight: '0.25rem',
        }}
      >
        {time}
      </div>{' '}
      <div className="para-md">{mychatdata}</div>
    </div>
  ) : (
    <div className={S.othercomponent}>
      <div
        style={{ background: 'var(--gray-100)', color: 'var(--black)' }}
        className="para-md"
      >
        {yourchatdata}
      </div>
      <div
        className="para-sm"
        style={{
          color: 'var(--gray-400)',
          background: 'white',
          padding: '0',
          marginLeft: '0.25rem',
        }}
      >
        {time}
      </div>
    </div>
  );
}

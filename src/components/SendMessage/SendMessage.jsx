// import { SendButton } from './Icone/SendButton';
import { SendEmoji } from './Icone/SendEmoji';
import { SendImg } from './Icone/SnedImg';

// !! stipop-react-sdk 내부
// defaultProps 경고
import { UnifiedComponent } from 'stipop-react-sdk';
import { useState } from 'react';
import S from './SendMessage.module.css';
import IconButton from '@/components/IconButton/IconButton';

function SendMessage() {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
    console.log(active);
  };

  const handleSendClick = () => {
    console.log('click');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className={S.component}>
        <SendImg />
        <div className={S.textInputWrap}>
          <input
            className={`${S.input} para-md`}
            placeholder="메시지 보내기"
          ></input>
          <SendEmoji onClick={handleClick} />
        </div>
        <IconButton
          title="메시지 보내기"
          className="i_send"
          onClick={handleSendClick}
        />
        {/* <SendButton /> */}
      </div>
      <div className={active ? S.block : S.none}>
        <UnifiedComponent
          stickerClick={(url) => {
            console.log(url);
          }}
          preview:true
          params={{
            apikey: '17905f61092c7cf66135a3f21b3e6782',
            userId: 'Han',
            countryCode: 'KR',
            lang: 'ko',
          }}
          size={{
            width: '100%',
          }}
        />
      </div>
    </div>
  );
}

export default SendMessage;

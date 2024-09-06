import { SendButton } from './Icone/SendButton';
import { SendEmoje } from './Icone/SendEmoje';
import { SendImg } from './Icone/SnedImg';
import { UnifiedComponent } from 'stipop-react-sdk';
import { useState } from 'react';
import S from './SendMessage.module.css';

function SendMessage() {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
    console.log(active);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className={S.component}>
        <SendImg />
        <div className={S.wrapper}>
          <input className={S.input} placeholder="메시지 보내기"></input>
          <SendEmoje onClick={handleClick} />
        </div>
        <SendButton />
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

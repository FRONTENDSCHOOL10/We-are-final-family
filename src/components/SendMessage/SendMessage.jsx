// import { SendButton } from './Icone/SendButton';
import { SendEmoji } from './Icone/SendEmoji';
import { SendImg } from './Icone/SnedImg';

// !! stipop-react-sdk 내부
// defaultProps 경고
// import { UnifiedComponent } from 'stipop-react-sdk';
import { useState } from 'react';
import S from './SendMessage.module.css';
import IconButton from '@/components/IconButton/IconButton';
import { useStore } from '@/stores/chatStore';

function SendMessage() {
  const store = useStore();
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
    console.log(active);
  };

  const onChange = (e) => {
    store.setNewMessage(e.target.value);

    console.log(store.newMessage);
  };

  const handleSendClick = async () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const selectedUser = { id: 'b9486e5b-1527-4ccd-b152-236ccdcaeb24' };

    store.setCurrentUser(currentUser);
    store.setSelectedUser(selectedUser);

    const room = await store.fetchOrCreateChatRoom();
    if (room) {
      console.log('채팅방 생성 또는 찾기 성공:', room);
      store.sendMessage(store.newMessage);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className={S.component}>
        <SendImg />
        <div className={S.textInputWrap}>
          <input
            className={`${S.input} para-md`}
            placeholder="메시지 보내기"
            onChange={onChange}
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
        {/* <UnifiedComponent
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
        /> */}
      </div>
    </div>
  );
}

export default SendMessage;

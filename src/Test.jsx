// import IconPreV from './components/IconPreV/IconPreV';
import { useState } from 'react';
import { createData, getData } from './api/DataService';
import Button from './components/Button/Button';
import { ChatSpeechbubble } from './components/ChatSpeechbubble/ChatSpeechbubble';
function Test() {
  const [state, setData] = useState([]);

  const Click = () => {
    createData({ from: 'chat_messages', values: { content: '채팅메세지' } });
    getData({
      form: 'chat_messages',
      select: 'content',
      setState: setData,
    });
  };

  return (
    <div>
      <Button color={'primary'} onClick={Click}>
        테스트버튼
      </Button>
      {state.map((item, index) => {
        return (
          <>
            <div
              key={index}
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-end',
              }}
            >
              <ChatSpeechbubble mychatdata={item.content} userId={2} />
            </div>
            <div>
              <ChatSpeechbubble yourchatdata={'안녕'} userId={4} />
            </div>
          </>
        );
      })}
    </div>
  );
}

export default Test;

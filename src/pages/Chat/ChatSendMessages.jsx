import { useState, useCallback, useEffect, useRef } from 'react';
import S from './ChatsendMessages.module.css';
import IconButton from '@/components/IconButton/IconButton';
import { useStore } from '@/stores/chatStore';
import { SendEmoji } from '@/components/SendMessage/Icone/SendEmoji';
import { SendImg } from '@/components/SendMessage/Icone/SnedImg';

function ChatSendMessages() {
  const [active, setActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    setNewMessage,
    newMessage,
    fetchOrCreateChatRoom,
    sendMessage,
    sendingMessage,
  } = useStore();
  const inputRef = useRef(null);
  const focusTimeoutRef = useRef(null);

  const handleClick = useCallback(() => {
    setActive((prev) => !prev);
  }, []);

  const onChange = useCallback(
    (e) => {
      setNewMessage(e.target.value);
    },
    [setNewMessage]
  );

  const focusInput = useCallback(() => {
    if (inputRef.current) {
      console.log('Attempting to focus input');
      // 포커스 설정을 약간 지연시킵니다.
      focusTimeoutRef.current = setTimeout(() => {
        inputRef.current.focus();
        console.log('Focus attempt completed');
      }, 0);
    } else {
      console.log('Input ref is null');
    }
  }, []);

  const handleSendClick = useCallback(async () => {
    if (newMessage.trim() && !sendingMessage && !isSubmitting) {
      setIsSubmitting(true);
      console.log('Sending message...');
      const room = await fetchOrCreateChatRoom();
      console.log(room);

      if (room) {
        await sendMessage();
        console.log('Message sent, attempting to focus');
        focusInput();
      }
      setIsSubmitting(false);
    }
  }, [
    fetchOrCreateChatRoom,
    sendMessage,
    newMessage,
    sendingMessage,
    isSubmitting,
    focusInput,
  ]);

  useEffect(() => {
    console.log('Component mounted, focusing input');
    focusInput();
    return () => {
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current);
      }
    };
  }, [focusInput]);

  useEffect(() => {
    if (newMessage === '') {
      console.log('New message is empty, focusing input');
      focusInput();
    }
  }, [focusInput, newMessage]);

  useEffect(() => {
    let timer;
    if (isSubmitting) {
      timer = setTimeout(() => {
        setIsSubmitting(false);
        console.log('isSubmitting set to false, focusing input');
        focusInput();
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isSubmitting, focusInput]);

  const handleKeyDown = useCallback(
    (e) => {
      if (
        e.key === 'Enter' &&
        !e.shiftKey &&
        !sendingMessage &&
        !isSubmitting
      ) {
        e.preventDefault();
        handleSendClick();
      }
    },
    [handleSendClick, sendingMessage, isSubmitting]
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        bottom: '0',
        width: '100%',
      }}
    >
      <div className={S.component}>
        <SendImg />
        <div className={S.textInputWrap}>
          <input
            ref={inputRef}
            className={`${S.input} para-md`}
            placeholder="메시지 보내기"
            onChange={onChange}
            value={newMessage}
            onKeyDown={handleKeyDown}
            disabled={sendingMessage || isSubmitting}
          />
          <SendEmoji onClick={handleClick} />
        </div>
        <IconButton
          title="메시지 보내기"
          className="i_send"
          onClick={handleSendClick}
          disabled={sendingMessage || isSubmitting || !newMessage.trim()}
        />
      </div>
      <div className={active ? S.block : S.none}>
        {/* UnifiedComponent 코드... */}
      </div>
    </div>
  );
}

export default ChatSendMessages;

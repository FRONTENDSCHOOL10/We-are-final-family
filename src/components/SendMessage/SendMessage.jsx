import { useState, useCallback, useEffect, useRef } from 'react';
import S from './SendMessage.module.css';
import IconButton from '@/components/IconButton/IconButton';
import { SendEmoji } from './Icone/SendEmoji';
import { SendImg } from './Icone/SnedImg';
import PropTypes from 'prop-types';

function SendMessage({ onSendMessage }) {
  const [active, setActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const inputRef = useRef(null);
  const focusTimeoutRef = useRef(null);

  const handleClick = useCallback(() => {
    setActive((prev) => !prev);
  }, []);

  const onChange = useCallback((e) => {
    setNewMessage(e.target.value);
  }, []);

  const focusInput = useCallback(() => {
    if (inputRef.current) {
      focusTimeoutRef.current = setTimeout(() => {
        inputRef.current.focus();
      }, 0);
    } else {
      console.log('Input ref is null');
    }
  }, []);

  const handleSendClick = useCallback(async () => {
    if (newMessage.trim() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await onSendMessage(newMessage);
        setNewMessage('');
      } catch (error) {
        console.error('Failed to send message:', error);
        // 여기에 에러 처리 로직 추가 (예: 사용자에게 알림)
      } finally {
        setIsSubmitting(false);
        focusInput();
      }
    }
  }, [newMessage, isSubmitting, onSendMessage, focusInput]);

  useEffect(() => {
    focusInput();
    return () => {
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current);
      }
    };
  }, [focusInput]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey && !isSubmitting) {
        e.preventDefault();
        handleSendClick();
      }
    },
    [handleSendClick, isSubmitting]
  );

  return (
    <div className={S.componentWrap}>
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
            disabled={isSubmitting}
          />
          <SendEmoji onClick={handleClick} />
        </div>
        <IconButton
          title="메시지 보내기"
          className="i_send"
          onClick={handleSendClick}
          disabled={isSubmitting || !newMessage.trim()}
        />
      </div>
      <div className={active ? S.block : S.none}>UnifiedComponent 코드...</div>
    </div>
  );
}

SendMessage.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
};

export default SendMessage;

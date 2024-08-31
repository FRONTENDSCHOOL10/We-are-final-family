import S from './HeaderTitle.module.css';
import IconButton from '@/components/IconButton/IconButton';
import PropTypes from 'prop-types';

function HeaderChat({ title, className }) {
  return (
    <header className={S.header}>
      <h1 className="hdg-lg">{title}</h1>
      <IconButton className={className} />
    </header>
  );
}

HeaderChat.propTypes = {
  title: PropTypes.string.isRequired, // title="" (문자열로 사용)
  className: PropTypes.string, // className="" (문자열로 사용)
};

export default HeaderChat;

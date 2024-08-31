import S from './HeaderChatDetail.module.css';
import IconButton from '@/components/IconButton/IconButton';
import PropTypes from 'prop-types';

function HeaderChatDetail({ contactName }) {
  return (
    <header className={S.header}>
      <IconButton className="i_direction_left" />
      <p className="lbl-md">{contactName}</p>
      <IconButton className="i_menu" />
    </header>
  );
}

HeaderChatDetail.propTypes = {
  contactName: PropTypes.string.isRequired, // contactName="" (문자열로 사용)
};

export default HeaderChatDetail;

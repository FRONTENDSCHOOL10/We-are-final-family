import PropTypes from 'prop-types';
import S from './Comment.module.css';

function formatDate(dateString) {
  const now = new Date();
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  if (year === now.getFullYear()) {
    // 같은 년도인 경우
    return `${month}.${day} ${hours}:${minutes}`;
  } else {
    // 다른 년도인 경우
    return `${year.toString().slice(-2)}.${month}.${day}`;
  }
}

function Comment({ userName, time, comment }) {
  const formattedTime = formatDate(time);

  return (
    <li className={`${S.commentItem} ${S.listItem}`}>
      <div className={S.commentHeader}>
        <span className={`${S.authorName} para-sm`}>{userName}</span>
        <time className={`${S.commentTime} para-util`} dateTime={time}>
          {formattedTime}
        </time>
      </div>
      <p className={`${S.commentText} para-md`}>{comment}</p>
    </li>
  );
}

Comment.propTypes = {
  userName: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
};

export default Comment;

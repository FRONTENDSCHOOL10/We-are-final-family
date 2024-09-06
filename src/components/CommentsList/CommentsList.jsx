import { string } from 'prop-types';
import S from './CommentsList.module.css';
import data from './data';

// prop 으로 유저이름 시간 댓글내용 받음
//더미데이터로 현재 데이터 쏘는중
//너무 힘듭니다.
//데이터 만들어지면 리펙토링 필요

CommentsList.propTypes = {
  userName: string,
  time: string,
  comment: string,
};

function CommentsList({ userName, time, comment }) {
  const commentCount = data.length; // 실제 댓글 수로 대체해야 합니다
  // const currentTime = new Date().toLocaleString(); // 실제 댓글 작성 시간으로 대체해야 합니다

  userName = data[0].userName;
  time = data[0].time;
  comment = data[0].comment;

  return (
    <section className={S.component} aria-label="댓글">
      <h1 id="commentsHeading" className="lbl-md">
        댓글 <span>{commentCount}</span>
      </h1>
      <ul aria-labelledby="commentsHeading">
        <li className={S.listItem}>
          <div>
            <span className={`${S.authorName} para-sm`}>{userName}</span>
            <time className={`${S.time} para-util`} dateTime={time}>
              {time}
            </time>
          </div>
          <p className="para-md">{comment}</p>
        </li>
      </ul>
    </section>
  );
}

export default CommentsList;

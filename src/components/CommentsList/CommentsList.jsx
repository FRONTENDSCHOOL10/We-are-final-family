import PropTypes from 'prop-types';
import S from './CommentsList.module.css';
import Comment from './Comment';

function CommentsList({ comments }) {
  return (
    <section className={S.component} aria-label="댓글">
      <h1 id="commentsHeading" className="lbl-md">
        댓글 <span>{comments.length}</span>
      </h1>
      <ul aria-labelledby="commentsHeading">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            userName={comment.users.username}
            time={comment.create_at}
            comment={comment.comment}
          />
        ))}
      </ul>
    </section>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      comment: PropTypes.string.isRequired,
      create_at: PropTypes.string.isRequired,
      users: PropTypes.shape({
        username: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default CommentsList;

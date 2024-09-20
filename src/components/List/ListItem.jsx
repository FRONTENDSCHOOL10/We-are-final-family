import Badge from '@/components/Badge/Badge';
import S from './ListItem.module.css';
import { string, number, func } from 'prop-types';
import { formatDateWithYear, formatTimeAgo } from '@/utils/formatDate';
import { Link } from 'react-router-dom';
import useViewCountStore from '@/stores/useViewCountStore';
import useCommentCountStore from '@/stores/useCommentCountStore';
import { useEffect } from 'react';

ListItem.propTypes = {
  id: string,
  type: string.isRequired,
  state: string,
  category: string,
  title: string,
  currentPeopleCount: number,
  peopleCount: number,
  date: string,
  place: string,
  createDate: string,
  onClick: func,
  boardImg: string,
};

function ListItem({
  id,
  type,
  state,
  category,
  title,
  currentPeopleCount,
  peopleCount,
  date,
  place,
  createDate,
  onClick,
  boardImg,
}) {
  const { viewCounts, fetchViewCount, incrementViewCount } =
    useViewCountStore();
  const { commentCounts, fetchCommentCount } = useCommentCountStore();

  useEffect(() => {
    if (type === 'board') {
      fetchViewCount(id);
      fetchCommentCount(id);
    }
  }, [type, id, fetchViewCount]);

  const badgePartyVariant =
    type === 'party'
      ? state === '모집중'
        ? 'recruit'
        : 'end_recruit'
      : 'default';
  const badgeCateVariant =
    type === 'party'
      ? state === '모집중'
        ? 'category'
        : 'end_category'
      : 'category';

  const formattedDate = formatDateWithYear(date);

  const timeSincePost = formatTimeAgo(createDate);
  const viewCount = viewCounts[id] || 0;
  const commentCount = commentCounts[id] || 0;

  const encodedId = btoa(id);

  const handleClick = (e) => {
    if (type === 'board') {
      incrementViewCount(id);
    }
    if (onClick) {
      onClick(e);
    }
  };

  if (type === 'party') {
    return (
      <li role="listitem" className={S.listItem} onClick={onClick}>
        <Link to={`/home/detail?q=${encodedId}`}>
          <ul aria-label="카테고리" className={S.category}>
            {state && (
              <li>
                <Badge text={state} variant={badgePartyVariant} />
              </li>
            )}
            <li>
              <Badge text={category} variant={badgeCateVariant} />
            </li>
          </ul>

          <h2 className="para-md">{title}</h2>

          <div className={`${S.info} para-sm`}>
            <p>
              <time dateTime={date}>{formattedDate}</time>
            </p>
            <span>&middot;</span>
            <p>{place}</p>
          </div>

          <div className={S.info_sub}>
            <p className={`${S.people_count} para-sm`}>
              <span className={`i_people_line`} aria-hidden="true"></span>
              <span className={`${S.current}`}>{currentPeopleCount}</span>
              <span aria-hidden="true">&#47;</span>
              <span>{peopleCount}</span>
            </p>
          </div>
        </Link>
      </li>
    );
  }

  if (type === 'board') {
    return (
      <li
        role="listitem"
        className={`${S.listItem} ${S.boardItem}`}
        onClick={handleClick}
      >
        <Link to={`/board/detail?q=${encodedId}`}>
          <div className={S.content}>
            <ul aria-label="카테고리" className={S.category}>
              <li>
                <Badge text={category} variant="category" />
              </li>
            </ul>

            <h2 className="para-md">{title}</h2>

            <div className={S.info_sub}>
              <p className={`${S.people_count} para-sm`}>
                <span>{timeSincePost}</span>
                <span aria-hidden="true">&middot;</span>
                <span>조회 {viewCount}</span>
                <span>댓글 {commentCount}</span>
              </p>
            </div>
          </div>
          <div className={S.thumbnail}>
            {boardImg ? (
              <img src={boardImg} alt={title} />
            ) : (
              <div className={S.noImage}></div>
            )}
          </div>
        </Link>
      </li>
    );
  }

  return null;
}

export default ListItem;

import Badge from '@/components/Badge/Badge';
import S from './ListItem.module.css';
import { string, number, func } from 'prop-types';
import { formatDateWithYear, formatTimeAgo } from '@/utils/formatDate';
import { Link } from 'react-router-dom';

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
}) {
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
  const viewCount = 0; // 수정 필요

  const encodedId = btoa(id);

  if (type === 'party') {
    // Party 타입에 대한 렌더링
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
    // Board 타입에 대한 렌더링
    return (
      <li
        role="listitem"
        className={`${S.listItem} ${S.boardItem}`}
        onClick={onClick}
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
              </p>
            </div>
          </div>
          <div className={S.thumbnail}>
            <img
              src="/src/assets/testImg/bonobobono.jpeg"
              alt="보노보노 이미지"
            />
          </div>
        </Link>
      </li>
    );
  }

  // 기본 렌더링 (필요한 경우 추가)
  return null;
}

export default ListItem;

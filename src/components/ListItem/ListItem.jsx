import Badge from '@/components/Badge/Badge';
import S from './ListItem.module.css';
import { string, number } from 'prop-types';
import { formatDate, formatTimeAgo } from '@/utils/formatDate';

// 사용 방법
// <ListItem
//  key={index}
//  state={
//     type === 'party'
//       ? item.state
//         ? '모집중'
//        : '모집마감'
//      : undefined
//  }
//  category={item.category}
//  title={item.title}
//  currentPeopleCount={1}
//  peopleCount={item.people}
//  date={item.date || '날짜를 불러올 수 없습니다.'}
//  place={item.place || '장소를 불러올 수 없습니다.'}
//  writeDate={item.write}
//  type={type}
// />

ListItem.propTypes = {
  state: string,
  category: string,
  title: string,
  currentPeopleCount: number,
  peopleCount: number,
  date: string,
  place: string,
  writeDate: string,
};

function ListItem({
  type,
  state,
  category,
  title,
  currentPeopleCount,
  peopleCount,
  date,
  place,
  writeDate,
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

  const formattedDate = formatDate(date);
  const timeSincePost = formatTimeAgo(writeDate);
  const viewCount = 0; // 수정 필요

  if (type === 'party') {
    // Party 타입에 대한 렌더링
    return (
      <li
        role="listitem"
        className={S.list_item}
        onClick={() => {
          console.log(title);
        }}
      >
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
      </li>
    );
  }

  if (type === 'board') {
    // Board 타입에 대한 렌더링
    return (
      <li role="listitem" className={`${S.list_item} ${S.board_item}`}>
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
      </li>
    );
  }

  // 기본 렌더링 (필요한 경우 추가)
  return null;
}

export default ListItem;

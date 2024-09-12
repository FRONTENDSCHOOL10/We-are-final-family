export function formatKrTime(date) {
  const offset = 9 * 60 * 60 * 1000; // 한국 시간은 UTC+9
  return new Date(date.getTime() + offset);
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const koreanDate = formatKrTime(date);

  // const month = koreanDate.getUTCMonth() + 1; // 월은 0부터 시작
  // const day = koreanDate.getUTCDate();
  const hours = koreanDate.getUTCHours();
  const minutes = koreanDate.getUTCMinutes();

  const ampm = hours >= 12 ? '오후' : '오전';
  const hour12 = hours % 12 || 12; // 0시를 12시로 변환

  return `${ampm} ${hour12}:${minutes < 10 ? '0' : ''}${minutes}`;
}

export function formatDateWithYear(dateString) {
  const date = new Date(dateString);
  const koreanDate = formatKrTime(date);

  const year = String(koreanDate.getUTCFullYear()).slice(2); // 년도 추출 (마지막 두 자리)
  const month = koreanDate.getUTCMonth() + 1; // 월은 0부터 시작
  const day = koreanDate.getUTCDate();

  return `${year}.${month < 10 ? '0' : ''}${month}.${
    day < 10 ? '0' : ''
  }${day}`; // 'YY.MM.DD' 형식으로 반환
}

export function formatTimeAgo(dateString) {
  const now = new Date();
  const koreanNow = formatKrTime(now);
  const postedDate = new Date(dateString);
  const koreanPostedDate = formatKrTime(postedDate);

  const differenceInMillis = koreanNow - koreanPostedDate;
  const differenceInMinutes = Math.floor(differenceInMillis / (1000 * 60));
  const differenceInHours = Math.floor(differenceInMillis / (1000 * 60 * 60));
  const differenceInDays = Math.floor(
    differenceInMillis / (1000 * 60 * 60 * 24)
  );

  if (differenceInMinutes < 1) {
    return '방금 전'; // 1분 이내의 경우
  } else if (differenceInMinutes < 60) {
    return `${differenceInMinutes}분 전`;
  } else if (differenceInHours < 24) {
    return `${differenceInHours}시간 전`;
  } else if (differenceInDays < 7) {
    return `${differenceInDays}일 전`;
  } else {
    const differenceInWeeks = Math.floor(differenceInDays / 7);
    return `${differenceInWeeks}주 전`;
  }
}

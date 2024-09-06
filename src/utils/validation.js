export function validateId(id) {
  if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(id)) {
    return '아이디는 영문자와 숫자만 사용 가능합니다.';
  } else if (id.length < 4) {
    return '아이디는 4자 이상이어야 합니다.';
  } else if (!/^[a-zA-Z0-9]+$/.test(id)) {
    return '아이디는 영문자와 숫자만 사용 가능합니다.';
  } else if (!/[a-zA-Z]/.test(id)) {
    return '아이디는 최소 하나의 영문자를 포함해야 합니다.';
  }
  return '';
}

export function validatePassword(password) {
  if (password.length < 8) {
    return '비밀번호는 8자 이상이어야 합니다.';
  } else if (
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password)
  ) {
    return '비밀번호는 대문자, 소문자, 숫자를 모두 포함해야 합니다.';
  }
  return '';
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return '유효한 이메일 주소를 입력해주세요.';
  }
  return '';
}

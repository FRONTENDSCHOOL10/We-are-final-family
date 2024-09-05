/* eslint-disable react/prop-types */
function Logo({ W = '', H = '' }) {
  // width와 height가 숫자로 전달된 경우 단위를 붙입니다.
  const widthUnit = typeof width === 'number' ? `${W}` : W;
  const heightUnit = typeof height === 'number' ? `${H}` : H;

  return (
    <img
      src="/logo.svg"
      alt="파티구함 로고"
      style={{ width: widthUnit, height: heightUnit }}
    />
  );
}

export default Logo;

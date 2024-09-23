import { string, func } from 'prop-types';
import S from './ProfileImg.module.css';

ProfileImg.propTypes = {
  image: string,
  width: string,
  height: string,
  display: string,
  onClick: func,
};

export function ProfileImg({
  image = '',
  width = '',
  height = '',
  display = 'none',
  onClick,
}) {
  const defaultImage = '/bonobobono.webp';

  const styled = {
    backgroundImage: `url(${image ? image : defaultImage})`,
    maxWidth: width,
    maxHeight: height,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className={S.ProfileImg}>
      <div className={S.component} style={styled}>
        <span
          aria-label="프로필 이미지 변경"
          className={`${S.pencil} i_pencil`}
          style={{ display: `${display}` }}
          onClick={onClick}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === '') {
              onClick();
            }
          }}
        ></span>
      </div>
    </div>
  );
}

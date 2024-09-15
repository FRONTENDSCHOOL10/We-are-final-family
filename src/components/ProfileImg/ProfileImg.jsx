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
  console.log('🚀 ~ image:', image);
  const defaultImage = '/src/assets/testImg/bonobobono.jpeg';

  const styled = {
    backgroundImage: `url(${image || defaultImage})`,
    maxWidth: width,
    maxHeight: height,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className={S.ProfileImg}>
      <div className={S.component} style={styled}>
        <span
          className={`${S.pencil} i_pencil`}
          style={{ display: `${display}` }}
          onClick={onClick}
        ></span>
      </div>
    </div>
  );
}

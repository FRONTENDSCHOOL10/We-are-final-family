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
  image = '/src/assets/testImg/bonobobono.jpeg',
  width = '',
  height = '',
  display = 'none',
  onClick,
}) {
  const styled = {
    backgroundImage: `url(${image})`,
    minWidth: width,
    minHeight: height,
  };

  return (
    <div>
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

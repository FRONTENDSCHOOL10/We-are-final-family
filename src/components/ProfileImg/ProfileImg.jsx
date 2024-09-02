import { string } from 'prop-types';
import S from './ProfileImg.module.css';

ProfileImg.propTypes = {
  image: string,
  width: string,
  height: string,
};

export function ProfileImg({
  image = '/src/assets/testImg/bonobobono.jpeg',
  width = '',
  height = '',
}) {
  const styled = {
    backgroundImage: `url(${image})`,
    width: width,
    height: height,
  };

  return <div className={S.component} style={styled}></div>;
}

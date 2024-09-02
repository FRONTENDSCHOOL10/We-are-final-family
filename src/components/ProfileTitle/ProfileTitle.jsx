import { node, string } from 'prop-types';
import S from './ProfileTitle.module.css';
ProfileTitle.propTypes = {
  children: node,
  name: string,
};

export function ProfileTitle({ children, name = '이름' }) {
  return (
    <>
      <div className={S.component}>
        <div>{name}</div>
        <div>{children}</div>
      </div>
    </>
  );
}

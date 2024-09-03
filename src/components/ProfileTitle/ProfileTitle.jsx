import { node, string } from 'prop-types';
import S from './ProfileTitle.module.css';
ProfileTitle.propTypes = {
  children: node,
  name: string,
  className: string,
};

export function ProfileTitle({ children, name = '이름', className }) {
  return (
    <>
      <div className={S.component}>
        <div className={className}>{name}</div>
        <div>{children}</div>
      </div>
    </>
  );
}

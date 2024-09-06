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
      <div className={`${S.component} lbl-md`}>
        <div className={className}>{name}</div>
        <span className="para-util">{children}</span>
      </div>
    </>
  );
}

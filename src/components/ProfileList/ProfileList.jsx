import { string, func } from 'prop-types';

ProfileList.propTypes = {
  label: string.isRequired,
  icon: string,
  onClick: func.isRequired,
  className: string,
};

function ProfileList({ label, icon, onClick, className = '' }) {
  return (
    <li
      tabIndex={0}
      className={`${className} para-md`}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {icon && <span className={icon}></span>}
      {label}
    </li>
  );
}

export default ProfileList;

import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import S from './Navigation.module.css';
import { NavigationData } from './data/NavigationData';

function Navigation() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const getLinkClass = (path) => {
    return `${S.btnCon} ${isActive(path) ? S.activeBtn : ''}`;
  };

  const getIconClass = (path, defaultIcon, activeIcon) => {
    return `${isActive(path) ? activeIcon : defaultIcon}`;
  };

  return (
    <nav className={S.nav}>
      {NavigationData.map((option) => (
        <Link
          key={option.value}
          to={option.path}
          className={getLinkClass(option.path)}
        >
          <span
            className={getIconClass(
              option.path,
              option.defaultIcon,
              option.activeIcon
            )}
            aria-hidden="true"
          />
          <span className="para-sm">{option.label}</span>
        </Link>
      ))}
    </nav>
  );
}

export default Navigation;

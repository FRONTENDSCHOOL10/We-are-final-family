import S from './Header.module.css';

function Header() {
  return (
    <header className={S.header}>
      <button>
        <span className="icon_certificate"></span>
      </button>
      <button>
        <span className="icon_like_filled"></span>
      </button>
      <button>
        <span className="icon_like_line"></span>
      </button>
      <button>
        <span className="icon_export"></span>
      </button>
      <button>
        <span className="icon_option"></span>
      </button>
    </header>
  );
}

export default Header;

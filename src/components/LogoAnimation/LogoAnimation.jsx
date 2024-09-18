import PropTypes from 'prop-types';
import styles from './LogoAnimation.module.css';

const LogoAnimation = ({ width = 200, height = 200 }) => {
  const wavePath = (
    <g className={styles.wave}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M43.2581 158.457C36.1654 149.07 22.4121 148.117 14.0924 156.436L9.64166 160.887C8.31608 162.213 6.16691 162.213 4.84134 160.887C3.51577 159.561 3.51578 157.412 4.84135 156.087L9.29213 151.636C20.5262 140.402 39.0973 141.689 48.6746 154.365L49.8735 155.952C57.0262 165.418 71.2477 165.418 78.4004 155.952C88.2693 142.89 107.891 142.89 117.76 155.952C124.913 165.418 139.134 165.418 146.287 155.952L147.486 154.365C157.063 141.689 175.635 140.402 186.869 151.636L191.319 156.087C192.645 157.412 192.645 159.561 191.319 160.887C189.994 162.213 187.844 162.213 186.519 160.887L182.068 156.436C173.749 148.117 159.995 149.07 152.903 158.457L151.704 160.044C141.835 173.106 122.213 173.106 112.344 160.044C105.191 150.577 90.9696 150.577 83.8169 160.044C73.948 173.106 54.3259 173.106 44.457 160.044L43.2581 158.457Z"
        fill="#148CE1"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M43.5966 180.665C36.3485 171.071 22.2941 170.098 13.7923 178.599L9.34154 183.05C8.18166 184.21 6.30113 184.21 5.14126 183.05C3.98139 181.89 3.9814 180.01 5.14128 178.85L9.59205 174.399C20.644 163.347 38.914 164.613 48.336 177.084L49.5349 178.67C56.8573 188.362 71.4164 188.362 78.7388 178.67C88.438 165.833 107.723 165.833 117.422 178.67C124.744 188.362 139.303 188.362 146.626 178.67L147.824 177.084C157.247 164.613 175.517 163.347 186.568 174.399L191.019 178.85C192.179 180.01 192.179 181.89 191.019 183.05C189.859 184.21 187.979 184.21 186.819 183.05L182.368 178.599C173.866 170.098 159.812 171.071 152.564 180.665L151.365 182.251C141.666 195.089 122.381 195.089 112.682 182.251C105.36 172.56 90.8007 172.56 83.4783 182.251C73.7791 195.089 54.4946 195.089 44.7954 182.251L43.5966 180.665Z"
        fill="#148CE1"
      />
    </g>
  );

  return (
    <div className={styles.container}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 193 192"
        className={styles.logo}
      >
        <defs>
          <mask id="mask">
            <rect width="100%" height="100%" fill="white">
              <animate
                attributeName="y"
                values="140; 0"
                dur="3s "
                repeatCount="indefinite"
              />
            </rect>
          </mask>
        </defs>

        <g mask="url(#mask)">
          {/* 정적인 로고 부분 */}
          <path
            d="M95.3547 0.120605V83.6836L47.9105 72.6643L95.3547 0.120605Z"
            fill="#148CE1"
          />
          <path
            d="M95.3545 0.120605V83.6836L142.799 72.6643L95.3545 0.120605Z"
            fill="#32AAFF"
          />
          <path
            d="M0.313232 61.645L95.3547 83.5306L40.5643 128.067L0.313232 61.645Z"
            fill="#0078CD"
          />
          <path
            d="M190.396 61.645L95.3549 83.5306L150.145 128.067L190.396 61.645Z"
            fill="#148CE1"
          />
          <path
            d="M95.3444 83.4963L150.139 128.036H40.5853L95.3444 83.4963Z"
            fill="#0068B1"
          />
          <path
            d="M59.0538 55.6738L48.012 72.6153L0.365845 61.6642L59.0538 55.6738Z"
            fill="#0068B1"
          />
          <path
            d="M131.708 55.6738L142.75 72.6153L190.396 61.6642L131.708 55.6738Z"
            fill="#0068B1"
          />

          {/* 움직이는 파도 부분 */}
          <g className={styles.movingWaves}>
            {wavePath}
            {wavePath}
            {wavePath}
            {wavePath}
          </g>
        </g>

        {/* 회색 로고 (마스크 밖에 표시) */}
        <g className={styles.grayLogo}>
          <path d="M95.3547 0.120605V83.6836L47.9105 72.6643L95.3547 0.120605Z" />
          <path d="M95.3545 0.120605V83.6836L142.799 72.6643L95.3545 0.120605Z" />
          <path d="M0.313232 61.645L95.3547 83.5306L40.5643 128.067L0.313232 61.645Z" />
          <path d="M190.396 61.645L95.3549 83.5306L150.145 128.067L190.396 61.645Z" />
          <path d="M95.3444 83.4963L150.139 128.036H40.5853L95.3444 83.4963Z" />
          <path d="M59.0538 55.6738L48.012 72.6153L0.365845 61.6642L59.0538 55.6738Z" />
          <path d="M131.708 55.6738L142.75 72.6153L190.396 61.6642L131.708 55.6738Z" />
          {/* {wavePath} */}
        </g>
      </svg>
    </div>
  );
};

LogoAnimation.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default LogoAnimation;

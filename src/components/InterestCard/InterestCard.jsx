import { bool, node, string } from 'prop-types';
import { InterestCardButton } from '../InterestCardButton/InterestCardButton';
import S from './InterestCard.module.css';
import { useState } from 'react';

InterestCard.propTypes = {
  active: bool,
  children: node,
  category: string,
};

// 전달되는 props
// children 자식 프론트앤드,백앤드 등 관심분야
// category 추후에 카테고리에 선택된 데이터 들어가야함
// active 상태되면 색상변경 오른쪽 아이콘 색상도 변경됨
// 기본값 false 로 되어있음 활성화 안된상태로 랜더링됨

export function InterestCard({ active = false, children, category }) {
  const [state, setState] = useState();

  useState(active);

  const handleClick = () => {
    setState((state) => !state);
  };

  active = true;
  const componentClass = state
    ? `${S.component} ${S.componentActive}`
    : `${S.component} ${S.componentInactive}`;
  const interestClass = state
    ? `${S.interest} ${S.interestActive}`
    : `${S.interest} ${S.interestInactive}`;
  const categoryClass = state
    ? `${S.category} ${S.categoryActive}`
    : `${S.category} ${S.categoryInactive}`;

  return (
    <div className={componentClass} onClick={handleClick}>
      <div className={S.textContainer}>
        <p className={interestClass}>{category}</p>
        <p className={categoryClass}>{children}</p>
      </div>
      <InterestCardButton active={state} />
    </div>
  );
}

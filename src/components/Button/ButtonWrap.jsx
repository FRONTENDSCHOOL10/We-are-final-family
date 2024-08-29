import { Button } from './Button';

export function ButtonWrap() {
  const handleClick = () => {
    console.log('클릭!');
  };

  return (
    <div>
      <h1>버튼입니다</h1>
      <Button
        active={true}
        style={{ background: 'var(--gray-900)' }}
        onClick={handleClick}
      >
        회원가입
      </Button>
      <Button
        disabled={true}
        style={{ background: 'var(--gray-900)' }}
        onClick={handleClick}
      >
        회원가입
      </Button>
      <Button
        active={true}
        style={{ background: 'var(--primary)' }}
        onClick={handleClick}
      >
        시작하기
      </Button>
      <Button
        active={true}
        onClick={handleClick}
        style={{
          background: 'var(----white)',
          color: 'black',
          border: '1px solid var(--black)',
        }}
      >
        관심분야 선택하기
      </Button>
    </div>
  );
}

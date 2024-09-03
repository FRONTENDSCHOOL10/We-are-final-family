import { Button } from './Button';

export function ButtonWrap() {
  const handleClick = () => {
    console.log('클릭!');
  };

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <h1>버튼입니다</h1>
      <Button color={'black'} onClick={handleClick}>
        회원가입
      </Button>
      <Button disabled={true} color={'black'} onClick={handleClick}>
        회원가입
      </Button>
      <Button color={'primary'} disabled={true} onClick={handleClick}>
        시작하기
      </Button>
      <Button onClick={handleClick} color={'white'}>
        관심분야 선택하기
      </Button>
    </div>
  );
}

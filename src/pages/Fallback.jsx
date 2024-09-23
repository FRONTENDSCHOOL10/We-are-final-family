import LogoAnimation from '@/components/LogoAnimation/LogoAnimation';

function Fallback() {
  return (
    <div
      style={{
        flex: '1',
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3rem',
        height: '100vh',
        color: 'var(--gray-700)',
      }}
    >
      <LogoAnimation width="5rem" height="5rem" />
      <p className="para-md">페이지를 불러오고 있습니다.</p>
    </div>
  );
}

export default Fallback;

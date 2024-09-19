import Spinner from '@/components/App/Spinner';

function Fallback() {
  return (
    <div
      style={{
        flex: '1',
        display: 'flex',
        flexFlow: 'column nowrap',
        gap: '3rem',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        color: 'var(--gray-700)',
      }}
    >
      <Spinner />
      <p className="para-md">페이지를 불러오고 있습니다.</p>
    </div>
  );
}

export default Fallback;

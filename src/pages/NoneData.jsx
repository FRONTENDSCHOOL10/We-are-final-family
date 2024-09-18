function NoneData() {
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        color: 'var(--gray-700)',
      }}
    >
      <span
        className="i_close"
        style={{
          padding: '0.25rem',
          fontSize: '1.25rem',
          color: 'var(--gray-300)',
          border: '1.5px solid var(--gray-200)',
          borderRadius: '3rem',
        }}
      ></span>
      <p className="para-md" style={{ color: 'var(--gray-600)' }}>
        데이터가 없습니다.
      </p>
    </div>
  );
}

export default NoneData;

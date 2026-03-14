export default function StarRating({ rating, score, variant = 'default' }) {
  const stars = [1, 2, 3, 4, 5];

  if (variant === 'sidebar') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {stars.map((star) => (
          <span
            key={star}
            style={{
              color: star <= rating ? '#ffc107' : '#e0e0e0',
              fontSize: '14px'
            }}
          >
            ★
          </span>
        ))}
        {score && <span style={{ fontSize: '12px', color: '#666', marginLeft: '4px' }}>{score}</span>}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {stars.map((star) => (
        <span
          key={star}
          style={{
            color: star <= rating ? '#ffc107' : '#e0e0e0',
            fontSize: '16px'
          }}
        >
          ★
        </span>
      ))}
      {score && <span style={{ fontSize: '14px', color: '#666', marginLeft: '4px' }}>({rating}.0)</span>}
    </div>
  );
}

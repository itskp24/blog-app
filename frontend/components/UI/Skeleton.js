import React from 'react';
import styles from '@/styles/UI/Skeleton.module.css';

const Skeleton = ({ width, height, borderRadius, marginBottom, className }) => {
  const style = {
    width: width || '100%',
    height: height || '1rem',
    borderRadius: borderRadius || 'var(--radius-sm)',
    marginBottom: marginBottom || '0',
  };

  return <div className={`${styles.skeleton} ${className || ''}`} style={style} />;
};

export default Skeleton;

export const SidebarSkeleton = () => {
  return (
    <div style={{ width: '100%' }}>
      <Skeleton width="140px" height="1.5rem" marginBottom="var(--space-5)" />
      
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ marginBottom: 'var(--space-5)' }}>
          <Skeleton width="100%" height="140px" borderRadius="var(--radius-sm)" marginBottom="var(--space-3)" />
          <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-1)' }}>
            <Skeleton width="60px" height="0.8rem" />
            <Skeleton width="80px" height="0.8rem" />
          </div>
          <Skeleton width="90%" height="1.1rem" />
        </div>
      ))}

      <div style={{ margin: 'var(--space-5) 0', borderTop: '1px solid var(--color-border)' }} />

      <Skeleton width="120px" height="1.5rem" marginBottom="var(--space-5)" />
      
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ 
          display: 'flex', 
          gap: 'var(--space-3)', 
          marginBottom: 'var(--space-5)',
          paddingBottom: 'var(--space-5)',
          borderBottom: i < 3 ? '1px solid var(--color-border-light)' : 'none'
        }}>
          <Skeleton width="44px" height="44px" borderRadius="var(--radius-full)" />
          <div style={{ flex: 1 }}>
            <Skeleton width="100px" height="1rem" marginBottom="var(--space-1)" />
            <Skeleton width="140px" height="0.8rem" marginBottom="var(--space-2)" />
            <div style={{ display: 'flex', gap: '4px' }}>
              {[1, 2, 3, 4, 5].map(s => <Skeleton key={s} width="12px" height="12px" borderRadius="2px" />)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const CommentSkeleton = () => {
  return (
    <div style={{ paddingBottom: 'var(--space-6)' }}>
      {[1, 2].map((i) => (
        <div key={i} style={{ 
          display: 'grid', 
          gridTemplateColumns: '44px 1fr', 
          gap: 'var(--space-3)', 
          padding: 'var(--space-5) 0',
          borderBottom: '1px solid var(--color-border)'
        }}>
          <Skeleton width="44px" height="44px" borderRadius="var(--radius-full)" />
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
              <Skeleton width="100px" height="1rem" />
              <Skeleton width="80px" height="0.8rem" />
            </div>
            <div style={{ display: 'flex', gap: '4px', marginBottom: 'var(--space-2)' }}>
               {[1, 2, 3, 4, 5].map(s => <Skeleton key={s} width="12px" height="12px" borderRadius="2px" />)}
            </div>
            <Skeleton width="100%" height="1rem" marginBottom="var(--space-2)" />
            <Skeleton width="70%" height="1rem" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const HomePageSkeleton = () => {
  return (
    <div className={styles.homeGrid}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <article key={i} className={styles.card}>
          <div className={styles.cardImage}>
            <Skeleton height="100%" />
          </div>
          <div className={styles.cardBody}>
            <Skeleton height="1.5rem" width="80%" marginBottom="0.75rem" />
            <Skeleton height="1rem" width="100%" marginBottom="0.5rem" />
            <Skeleton height="1rem" width="90%" marginBottom="1.5rem" />
            <div className={styles.cardFooter}>
              <div className={styles.cardAuthor}>
                <Skeleton width="32px" height="32px" borderRadius="var(--radius-full)" />
                <Skeleton width="60px" height="12px" />
              </div>
              <Skeleton width="80px" height="12px" />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

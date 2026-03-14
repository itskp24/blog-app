'use client';

import Image from 'next/image';
import { useEditMode } from '@/hooks/useEditMode';
import styles from '@/styles/Comments.module.css';

export default function ArticleMeta({ author, date }) {
  const editContext = useEditMode();

  const handleEditClick = () => {
    if (editContext) {
      editContext.setIsEditing(true);
    }
  };

  return (
    <div style={{
      marginBottom: 'var(--space-6)',
      paddingBottom: 'var(--space-4)',
      borderBottom: '1px solid var(--color-border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <Image
          src={author.avatar}
          alt={author.name}
          style={{ borderRadius: '50%' }}
          width={40}
          height={40}
        />
        <div>
          <p style={{ fontWeight: '600', fontSize: '14px', margin: 0 }}>{author.name}</p>
          <time style={{ fontSize: '12px', color: '#999', margin: 0 }}>
            {date}
          </time>
        </div>
      </div>
      <button
        onClick={handleEditClick}
        className={styles['edit-article-btn']}
      >
        ✎ Edit Article
      </button>
    </div>
  );
}

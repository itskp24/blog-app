'use client';

import { useState } from 'react';
import styles from '@/styles/MarkdownEditor.module.css';

export default function MarkdownEditor({ initialContent, onSave, onCancel }) {
  const [content, setContent] = useState(Array.isArray(initialContent) ? initialContent.join('\n\n') : initialContent);

  return (
    <div className={styles['editor-container']}>
      <h3 className={styles['editor-heading']}>Edit Article Markdown</h3>
      <textarea
        className={styles['editor-textarea']}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter markdown content..."
      />
      <div className={styles['editor-actions']}>
        <button className={`${styles.btn} ${styles['btn-cancel']}`} onClick={onCancel}>
          Cancel
        </button>
        <button className={`${styles.btn} ${styles['btn-save']}`} onClick={() => onSave(content)}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

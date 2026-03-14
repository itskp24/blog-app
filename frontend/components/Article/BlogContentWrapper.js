'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import ArticleBody from './ArticleBody';
import { useEditMode } from '@/hooks/useEditMode';

const MarkdownEditor = dynamic(() => import('@/components/MarkdownEditor/MarkdownEditor'), {
  loading: () => <p style={{ padding: '2rem', textAlign: 'center' }}>Loading Editor...</p>,
  ssr: false,
});

export default function BlogContentWrapper({ initialPost }) {
  const [postBody, setPostBody] = useState(initialPost.body);
  const editContext = useEditMode();
  const isEditing = editContext?.isEditing || false;

  const handleSave = (newContent) => {
    setPostBody(newContent.split('\n\n'));
    if (editContext) {
      editContext.setIsEditing(false);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {isEditing ? (
        <MarkdownEditor
          initialContent={postBody}
          onSave={handleSave}
          onCancel={() => {
            if (editContext) {
              editContext.setIsEditing(false);
            }
          }}
        />
      ) : (
        <ArticleBody body={postBody} blockquote={initialPost.blockquote} />
      )}
    </div>
  );
}

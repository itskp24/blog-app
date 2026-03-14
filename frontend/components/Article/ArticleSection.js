'use client';

import { useState } from 'react';
import ArticleMeta from './ArticleMeta';
import BlogContentWrapper from './BlogContentWrapper';
import { EditProvider } from '@/hooks/useEditMode';

export default function ArticleSection({ post }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <EditProvider value={{ isEditing, setIsEditing }}>
      <article>
        <ArticleMeta author={post.author} date={post.date} />
        <BlogContentWrapper initialPost={post} />
      </article>
    </EditProvider>
  );
}

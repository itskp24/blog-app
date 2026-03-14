'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import api from '@/lib/api';
import { CommentSkeleton } from '../UI/Skeleton';
import StarRating from '../UI/StarRating';
import CommentForm from './CommentForm';
import styles from '@/styles/Comments.module.css';

export default function Comments({ slug }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [avatarErr, setAvatarErr] = useState({});

  useEffect(() => {
    setLoading(true);
    setError(null);
    setAvatarErr({});
    api.fetchComments(slug)
      .then((data) => setComments(data))
      .catch(() => setError('Failed to load comments. Please try again later.'))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleAvatarError = (id) => {
    setAvatarErr(prev => ({ ...prev, [id]: true }));
  };

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const newComment = await api.postComment(slug, formData);
      setComments((prev) => [...prev, newComment]);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      setError('Failed to submit comment.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <div className={styles.comments__section}>
        <h2 className={styles.comments__heading}>Comments</h2>

        {loading && (
          <CommentSkeleton />
        )}

        {error && !loading && (
          <p style={{ color: 'red', fontSize: 'var(--fs-sm)' }}>{error}</p>
        )}

        {!loading && !error && comments.length === 0 && (
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--fs-sm)' }}>
            No comments yet. Be the first to comment!
          </p>
        )}

        {!loading && comments.map((comment) => (
          <article key={comment.id} className={styles.comment}>
            <div className={styles.comment__avatar_wrapper}>
              <Image
                src={(avatarErr[comment.id] || !comment.avatar || comment.avatar.includes('placeholder')) 
                  ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces' 
                  : comment.avatar}
                alt={comment.author || 'User avatar'}
                className={styles.comment__avatar}
                width={44}
                height={44}
                onError={() => handleAvatarError(comment.id)}
              />
            </div>
            <div className={styles.comment__body}>
              <div className={styles.comment__header}>
                <span className={styles.comment__author}>
                  {comment.author || 'Anonymous'}
                </span>
                <time className={styles.comment__date}>{comment.date}</time>
              </div>
              <StarRating rating={comment.rating} />
              <p className={styles.comment__text}>{comment.text}</p>
            </div>
          </article>
        ))}
      </div>

      <CommentForm onSubmit={handleSubmit} submitting={submitting} submitted={submitted} />
    </section>
  );
}

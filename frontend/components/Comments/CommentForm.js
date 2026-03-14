'use client';

import { useState } from 'react';
import styles from '@/styles/Comments.module.css';

export default function CommentForm({ onSubmit, submitting, submitted }) {
  const [form, setForm] = useState({ author: '', email: '', text: '' });
  const [emojiRating, setEmojiRating] = useState(null);

  const EMOJIS = ['😡', '😒', '😐', '🙂', '😄'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.author || !form.text) return;

    await onSubmit({
      author: form.author,
      email: form.email,
      text: form.text,
      rating: emojiRating !== null ? emojiRating + 1 : 5,
    });

    setForm({ author: '', email: '', text: '' });
    setEmojiRating(null);
  };

  return (
    <form className={styles['comment-form']} onSubmit={handleSubmit}>
      <h2 className={styles['comment-form__heading']}>Add A Comment</h2>

      <div className={styles['comment-form__grid']}>
        <div className={styles['comment-form__field']}>
          <label htmlFor="comment-name" className={styles['comment-form__label']}>Name</label>
          <input
            id="comment-name"
            type="text"
            placeholder="Enter your name"
            className={styles['comment-form__input']}
            value={form.author}
            onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
            required
            minLength="2"
            maxLength="50"
          />
        </div>

        <div className={`${styles['comment-form__field']} ${styles['comment-form__field--comment']}`}>
          <label htmlFor="comment-text" className={styles['comment-form__label']}>Comment</label>
          <textarea
            id="comment-text"
            className={styles['comment-form__textarea']}
            placeholder="Share your thoughts..."
            value={form.text}
            onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
            required
          />
        </div>

        <div className={styles['comment-form__field']}>
          <label htmlFor="comment-email" className={styles['comment-form__label']}>Email</label>
          <input
            id="comment-email"
            type="email"
            placeholder="your.email@example.com"
            className={styles['comment-form__input']}
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className={styles['comment-form__footer']}>
        <span className={styles['comment-form__rating-label']}>Rate The Usefulness Of The Article</span>
        <div className={styles['comment-form__emojis']}>
          {EMOJIS.map((emoji, idx) => {
            const labels = ['Bad', 'Poor', 'Okay', 'Good', 'Excellent'];
            return (
              <button
                key={idx}
                type="button"
                className={`${styles['comment-form__emoji-btn']} ${emojiRating === idx ? styles['comment-form__emoji-btn--active'] : ''}`}
                onClick={() => setEmojiRating(idx)}
                aria-label={`Rate ${labels[idx]}`}
                data-label={labels[idx]}
              >
                {emoji}
              </button>
            );
          })}
        </div>
        <div className={styles['comment-form__actions']}>
          {emojiRating !== null && (
            <button
              type="button"
              className={styles['comment-form__good-btn']}
              style={{
                background: emojiRating === 0 ? '#ef4444' : emojiRating === 1 ? '#f97316' : emojiRating === 2 ? '#eab308' : emojiRating === 3 ? '#22c55e' : '#10b981'
              }}
            >
              {EMOJIS[emojiRating]} {['Bad', 'Poor', 'Okay', 'Good', 'Excellent'][emojiRating]}
            </button>
          )}
          <button
            type="submit"
            className={styles['comment-form__send-btn']}
            disabled={submitting}
          >
            ✉ {submitting ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>

      {submitted && (
        <p className={styles['comment-form__success']}>
          ✓ Your comment was submitted successfully!
        </p>
      )}
    </form>
  );
}
